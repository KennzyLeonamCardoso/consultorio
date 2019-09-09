package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.domain.Tercerizado;
import io.github.jhipster.application.repository.TercerizadoRepository;
import io.github.jhipster.application.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link io.github.jhipster.application.domain.Tercerizado}.
 */
@RestController
@RequestMapping("/api")
public class TercerizadoResource {

    private final Logger log = LoggerFactory.getLogger(TercerizadoResource.class);

    private static final String ENTITY_NAME = "tercerizado";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TercerizadoRepository tercerizadoRepository;

    public TercerizadoResource(TercerizadoRepository tercerizadoRepository) {
        this.tercerizadoRepository = tercerizadoRepository;
    }

    /**
     * {@code POST  /tercerizados} : Create a new tercerizado.
     *
     * @param tercerizado the tercerizado to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new tercerizado, or with status {@code 400 (Bad Request)} if the tercerizado has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/tercerizados")
    public ResponseEntity<Tercerizado> createTercerizado(@RequestBody Tercerizado tercerizado) throws URISyntaxException {
        log.debug("REST request to save Tercerizado : {}", tercerizado);
        if (tercerizado.getId() != null) {
            throw new BadRequestAlertException("A new tercerizado cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Tercerizado result = tercerizadoRepository.save(tercerizado);
        return ResponseEntity.created(new URI("/api/tercerizados/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /tercerizados} : Updates an existing tercerizado.
     *
     * @param tercerizado the tercerizado to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated tercerizado,
     * or with status {@code 400 (Bad Request)} if the tercerizado is not valid,
     * or with status {@code 500 (Internal Server Error)} if the tercerizado couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/tercerizados")
    public ResponseEntity<Tercerizado> updateTercerizado(@RequestBody Tercerizado tercerizado) throws URISyntaxException {
        log.debug("REST request to update Tercerizado : {}", tercerizado);
        if (tercerizado.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Tercerizado result = tercerizadoRepository.save(tercerizado);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, tercerizado.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /tercerizados} : get all the tercerizados.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of tercerizados in body.
     */
    @GetMapping("/tercerizados")
    public List<Tercerizado> getAllTercerizados() {
        log.debug("REST request to get all Tercerizados");
        return tercerizadoRepository.findAll();
    }

    /**
     * {@code GET  /tercerizados/:id} : get the "id" tercerizado.
     *
     * @param id the id of the tercerizado to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the tercerizado, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/tercerizados/{id}")
    public ResponseEntity<Tercerizado> getTercerizado(@PathVariable Long id) {
        log.debug("REST request to get Tercerizado : {}", id);
        Optional<Tercerizado> tercerizado = tercerizadoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(tercerizado);
    }

    /**
     * {@code DELETE  /tercerizados/:id} : delete the "id" tercerizado.
     *
     * @param id the id of the tercerizado to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/tercerizados/{id}")
    public ResponseEntity<Void> deleteTercerizado(@PathVariable Long id) {
        log.debug("REST request to delete Tercerizado : {}", id);
        tercerizadoRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
