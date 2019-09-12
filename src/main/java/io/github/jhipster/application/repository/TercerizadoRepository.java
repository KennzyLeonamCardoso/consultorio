package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.Tercerizado;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Tercerizado entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TercerizadoRepository extends JpaRepository<Tercerizado, Long> {

}
