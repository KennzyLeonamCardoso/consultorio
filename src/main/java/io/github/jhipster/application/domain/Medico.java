package io.github.jhipster.application.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Medico.
 */
@Entity
@Table(name = "medico")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Medico implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome")
    private String nome;

    @Column(name = "salario")
    private Double salario;

    @ManyToOne
    @JsonIgnoreProperties("medicos")
    private Funcionario funcionario;

    @OneToMany(mappedBy = "medico")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Consulta> consultas = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public Medico nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Double getSalario() {
        return salario;
    }

    public Medico salario(Double salario) {
        this.salario = salario;
        return this;
    }

    public void setSalario(Double salario) {
        this.salario = salario;
    }

    public Funcionario getFuncionario() {
        return funcionario;
    }

    public Medico funcionario(Funcionario funcionario) {
        this.funcionario = funcionario;
        return this;
    }

    public void setFuncionario(Funcionario funcionario) {
        this.funcionario = funcionario;
    }

    public Set<Consulta> getConsultas() {
        return consultas;
    }

    public Medico consultas(Set<Consulta> consultas) {
        this.consultas = consultas;
        return this;
    }

    public Medico addConsulta(Consulta consulta) {
        this.consultas.add(consulta);
        consulta.setMedico(this);
        return this;
    }

    public Medico removeConsulta(Consulta consulta) {
        this.consultas.remove(consulta);
        consulta.setMedico(null);
        return this;
    }

    public void setConsultas(Set<Consulta> consultas) {
        this.consultas = consultas;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Medico)) {
            return false;
        }
        return id != null && id.equals(((Medico) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Medico{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            ", salario=" + getSalario() +
            "}";
    }
}
