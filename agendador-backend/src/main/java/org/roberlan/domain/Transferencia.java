package org.roberlan.domain;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
public class Transferencia {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Pattern(regexp = "\\d{10}", message = "contaOrigem deve ter 10 dígitos")
    @Column(nullable = false, length = 10)
    private String contaOrigem;

    @Pattern(regexp = "\\d{10}", message = "contaDestino deve ter 10 dígitos")
    @Column(nullable = false, length = 10)
    private String contaDestino;

    @NotNull
    @Positive
    @Column(nullable = false, precision = 18, scale = 2)
    private BigDecimal valor;

    @NotNull
    @Column(nullable = false, precision = 18, scale = 2)
    private BigDecimal taxa;

    @NotNull
    @Column(nullable = false)
    private LocalDate dataAgendamento;

    @NotNull
    @Column(nullable = false)
    private LocalDate dataTransferencia;

    public Transferencia() {
    }

    public Long getId() {
        return id;
    }

    public String getContaOrigem() {
        return contaOrigem;
    }

    public void setContaOrigem(String contaOrigem) {
        this.contaOrigem = contaOrigem;
    }

    public String getContaDestino() {
        return contaDestino;
    }

    public void setContaDestino(String contaDestino) {
        this.contaDestino = contaDestino;
    }

    public BigDecimal getValor() {
        return valor;
    }

    public void setValor(BigDecimal valor) {
        this.valor = valor;
    }

    public BigDecimal getTaxa() {
        return taxa;
    }

    public void setTaxa(BigDecimal taxa) {
        this.taxa = taxa;
    }

    public LocalDate getDataAgendamento() {
        return dataAgendamento;
    }

    public void setDataAgendamento(LocalDate dataAgendamento) {
        this.dataAgendamento = dataAgendamento;
    }

    public LocalDate getDataTransferencia() {
        return dataTransferencia;
    }

    public void setDataTransferencia(LocalDate dataTransferencia) {
        this.dataTransferencia = dataTransferencia;
    }
}
