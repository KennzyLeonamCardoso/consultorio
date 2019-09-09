package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.ConsultorioApp;
import io.github.jhipster.application.domain.Tercerizado;
import io.github.jhipster.application.repository.TercerizadoRepository;
import io.github.jhipster.application.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;

import static io.github.jhipster.application.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link TercerizadoResource} REST controller.
 */
@SpringBootTest(classes = ConsultorioApp.class)
public class TercerizadoResourceIT {

    private static final String DEFAULT_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NOME = "BBBBBBBBBB";

    private static final Double DEFAULT_SALARIO = 1D;
    private static final Double UPDATED_SALARIO = 2D;
    private static final Double SMALLER_SALARIO = 1D - 1D;

    @Autowired
    private TercerizadoRepository tercerizadoRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restTercerizadoMockMvc;

    private Tercerizado tercerizado;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TercerizadoResource tercerizadoResource = new TercerizadoResource(tercerizadoRepository);
        this.restTercerizadoMockMvc = MockMvcBuilders.standaloneSetup(tercerizadoResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Tercerizado createEntity(EntityManager em) {
        Tercerizado tercerizado = new Tercerizado()
            .nome(DEFAULT_NOME)
            .salario(DEFAULT_SALARIO);
        return tercerizado;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Tercerizado createUpdatedEntity(EntityManager em) {
        Tercerizado tercerizado = new Tercerizado()
            .nome(UPDATED_NOME)
            .salario(UPDATED_SALARIO);
        return tercerizado;
    }

    @BeforeEach
    public void initTest() {
        tercerizado = createEntity(em);
    }

    @Test
    @Transactional
    public void createTercerizado() throws Exception {
        int databaseSizeBeforeCreate = tercerizadoRepository.findAll().size();

        // Create the Tercerizado
        restTercerizadoMockMvc.perform(post("/api/tercerizados")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tercerizado)))
            .andExpect(status().isCreated());

        // Validate the Tercerizado in the database
        List<Tercerizado> tercerizadoList = tercerizadoRepository.findAll();
        assertThat(tercerizadoList).hasSize(databaseSizeBeforeCreate + 1);
        Tercerizado testTercerizado = tercerizadoList.get(tercerizadoList.size() - 1);
        assertThat(testTercerizado.getNome()).isEqualTo(DEFAULT_NOME);
        assertThat(testTercerizado.getSalario()).isEqualTo(DEFAULT_SALARIO);
    }

    @Test
    @Transactional
    public void createTercerizadoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tercerizadoRepository.findAll().size();

        // Create the Tercerizado with an existing ID
        tercerizado.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTercerizadoMockMvc.perform(post("/api/tercerizados")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tercerizado)))
            .andExpect(status().isBadRequest());

        // Validate the Tercerizado in the database
        List<Tercerizado> tercerizadoList = tercerizadoRepository.findAll();
        assertThat(tercerizadoList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllTercerizados() throws Exception {
        // Initialize the database
        tercerizadoRepository.saveAndFlush(tercerizado);

        // Get all the tercerizadoList
        restTercerizadoMockMvc.perform(get("/api/tercerizados?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tercerizado.getId().intValue())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME.toString())))
            .andExpect(jsonPath("$.[*].salario").value(hasItem(DEFAULT_SALARIO.doubleValue())));
    }
    
    @Test
    @Transactional
    public void getTercerizado() throws Exception {
        // Initialize the database
        tercerizadoRepository.saveAndFlush(tercerizado);

        // Get the tercerizado
        restTercerizadoMockMvc.perform(get("/api/tercerizados/{id}", tercerizado.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(tercerizado.getId().intValue()))
            .andExpect(jsonPath("$.nome").value(DEFAULT_NOME.toString()))
            .andExpect(jsonPath("$.salario").value(DEFAULT_SALARIO.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingTercerizado() throws Exception {
        // Get the tercerizado
        restTercerizadoMockMvc.perform(get("/api/tercerizados/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTercerizado() throws Exception {
        // Initialize the database
        tercerizadoRepository.saveAndFlush(tercerizado);

        int databaseSizeBeforeUpdate = tercerizadoRepository.findAll().size();

        // Update the tercerizado
        Tercerizado updatedTercerizado = tercerizadoRepository.findById(tercerizado.getId()).get();
        // Disconnect from session so that the updates on updatedTercerizado are not directly saved in db
        em.detach(updatedTercerizado);
        updatedTercerizado
            .nome(UPDATED_NOME)
            .salario(UPDATED_SALARIO);

        restTercerizadoMockMvc.perform(put("/api/tercerizados")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTercerizado)))
            .andExpect(status().isOk());

        // Validate the Tercerizado in the database
        List<Tercerizado> tercerizadoList = tercerizadoRepository.findAll();
        assertThat(tercerizadoList).hasSize(databaseSizeBeforeUpdate);
        Tercerizado testTercerizado = tercerizadoList.get(tercerizadoList.size() - 1);
        assertThat(testTercerizado.getNome()).isEqualTo(UPDATED_NOME);
        assertThat(testTercerizado.getSalario()).isEqualTo(UPDATED_SALARIO);
    }

    @Test
    @Transactional
    public void updateNonExistingTercerizado() throws Exception {
        int databaseSizeBeforeUpdate = tercerizadoRepository.findAll().size();

        // Create the Tercerizado

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTercerizadoMockMvc.perform(put("/api/tercerizados")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tercerizado)))
            .andExpect(status().isBadRequest());

        // Validate the Tercerizado in the database
        List<Tercerizado> tercerizadoList = tercerizadoRepository.findAll();
        assertThat(tercerizadoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTercerizado() throws Exception {
        // Initialize the database
        tercerizadoRepository.saveAndFlush(tercerizado);

        int databaseSizeBeforeDelete = tercerizadoRepository.findAll().size();

        // Delete the tercerizado
        restTercerizadoMockMvc.perform(delete("/api/tercerizados/{id}", tercerizado.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Tercerizado> tercerizadoList = tercerizadoRepository.findAll();
        assertThat(tercerizadoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Tercerizado.class);
        Tercerizado tercerizado1 = new Tercerizado();
        tercerizado1.setId(1L);
        Tercerizado tercerizado2 = new Tercerizado();
        tercerizado2.setId(tercerizado1.getId());
        assertThat(tercerizado1).isEqualTo(tercerizado2);
        tercerizado2.setId(2L);
        assertThat(tercerizado1).isNotEqualTo(tercerizado2);
        tercerizado1.setId(null);
        assertThat(tercerizado1).isNotEqualTo(tercerizado2);
    }
}
