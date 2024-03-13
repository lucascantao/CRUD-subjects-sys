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

    @Column(name = "nome_usuario")
    private String nomeUsuario;

    private String category;

    @Column(name = "assunto")
    private String assunto;

    private String description;
}
