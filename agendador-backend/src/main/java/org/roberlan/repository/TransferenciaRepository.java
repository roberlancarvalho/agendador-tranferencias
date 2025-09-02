package org.roberlan.repository;

import org.roberlan.domain.Transferencia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface TransferenciaRepository extends JpaRepository<Transferencia, Long> {

    @Modifying(clearAutomatically = true, flushAutomatically = true)
    @Query("delete from Transferencia t where t.id = :id")
    int hardDelete(@Param("id") Long id);
}
