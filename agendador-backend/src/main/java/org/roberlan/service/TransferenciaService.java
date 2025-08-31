package org.roberlan.service;

import org.roberlan.domain.TransferenciaDTO;
import org.roberlan.domain.Transferencia;
import org.roberlan.repository.TransferenciaRepository;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
public class TransferenciaService {

    private final TransferenciaRepository repo;

    public TransferenciaService(TransferenciaRepository repo) {
        this.repo = repo;
    }

    @Transactional
    public Transferencia agendar(@Valid TransferenciaDTO dto) {
        LocalDate hoje = LocalDate.now();
        if (dto.dataTransferencia.isBefore(hoje)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Data de transferência no passado.");
        }
        BigDecimal taxa = calcularTaxa(dto.valor, hoje, dto.dataTransferencia);

        Transferencia t = new Transferencia();
        t.setContaOrigem(dto.contaOrigem);
        t.setContaDestino(dto.contaDestino);
        t.setValor(dto.valor);
        t.setTaxa(taxa);
        t.setDataAgendamento(hoje);
        t.setDataTransferencia(dto.dataTransferencia);

        return repo.saveAndFlush(t);
    }

    @Transactional(readOnly = true)
    public List<Transferencia> listar() {
        return repo.findAll();
    }

    public BigDecimal calcularTaxa(BigDecimal valor, LocalDate agendamento, LocalDate transferencia) {
        long dias = ChronoUnit.DAYS.between(agendamento, transferencia);
        if (dias == 0) return bd(3).add(valor.multiply(bd(0.025))).setScale(2, RoundingMode.HALF_UP);
        if (dias >= 1 && dias <= 10) return bd(12);
        if (dias >= 11 && dias <= 20) return valor.multiply(bd(0.082)).setScale(2, RoundingMode.HALF_UP);
        if (dias >= 21 && dias <= 30) return valor.multiply(bd(0.069)).setScale(2, RoundingMode.HALF_UP);
        if (dias >= 31 && dias <= 40) return valor.multiply(bd(0.047)).setScale(2, RoundingMode.HALF_UP);
        if (dias >= 41 && dias <= 50) return valor.multiply(bd(0.017)).setScale(2, RoundingMode.HALF_UP);
        throw new ResponseStatusException(HttpStatus.UNPROCESSABLE_ENTITY, "Não há taxa aplicável para esse intervalo.");
    }

    private static BigDecimal bd(double v) {
        return BigDecimal.valueOf(v);
    }

    @Transactional
    public void deletar(Long id) {
        try {
            if (!repo.existsById(id)) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Transferência não encontrada");
            }
            repo.deleteById(id);
            repo.flush();
        } catch (EmptyResultDataAccessException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Transferência não encontrada", e);
        } catch (DataIntegrityViolationException e) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Não é possível excluir este registro.", e);
        }
    }
}
