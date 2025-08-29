package org.roberlan.domain;

import javax.validation.constraints.*;
import java.math.BigDecimal;
import java.time.LocalDate;

public class TransferenciaDTO {
    @Pattern(regexp = "\\d{10}")
    public String contaOrigem;
    @Pattern(regexp = "\\d{10}")
    public String contaDestino;
    @NotNull
    @Positive
    public BigDecimal valor;
    @NotNull
    public LocalDate dataTransferencia;
}
