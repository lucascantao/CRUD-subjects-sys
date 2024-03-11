package com.lucascantao.mycrud.models;


import jakarta.persistence.*;
import lombok.*;


import java.time.LocalDate;

@Entity
@Table(name = "subject")
@Getter @Setter
public class SubjectModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "data")
    private LocalDate data;

    @Column(name = "ano")
    private String ano;

    @Column(name = "nome_usuario")
    private String nomeUsuario;

    @Column(name="destino")
    private String destino;

    @Column(name="processo_doc")
    private String processoDoc;

    @Column(name = "assunto")
    private String assunto;

    @Column(name = "observacoes")
    private String observacoes;
}
