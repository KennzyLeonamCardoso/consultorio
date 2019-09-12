package io.github.jhipster.application.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Tercerizado.
 */
@Entity
@Table(name = "tercerizado")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Tercerizado implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome")
    private String nome;

    @Column(name = "salario")
    private Double salario;

    @OneToMany(mappedBy = "tercerizado")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Funcionario> funcionarios = new HashSet<>();

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

    public Tercerizado nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Double getSalario() {
        return salario;
    }

    public Tercerizado salario(Double salario) {
        this.salario = salario;
        return this;
    }

    public void setSalario(Double salario) {
        this.salario = salario;
    }

    public Set<Funcionario> getFuncionarios() {
        return funcionarios;
    }

    public Tercerizado funcionarios(Set<Funcionario> funcionarios) {
        this.funcionarios = funcionarios;
        return this;
    }

    public Tercerizado addFuncionario(Funcionario funcionario) {
        this.funcionarios.add(funcionario);
        funcionario.setTercerizado(this);
        return this;
    }

    public Tercerizado removeFuncionario(Funcionario funcionario) {
        this.funcionarios.remove(funcionario);
        funcionario.setTercerizado(null);
        return this;
    }

    public void setFuncionarios(Set<Funcionario> funcionarios) {
        this.funcionarios = funcionarios;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Tercerizado)) {
            return false;
        }
        return id != null && id.equals(((Tercerizado) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Tercerizado{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            ", salario=" + getSalario() +
            "}";
    }
}
