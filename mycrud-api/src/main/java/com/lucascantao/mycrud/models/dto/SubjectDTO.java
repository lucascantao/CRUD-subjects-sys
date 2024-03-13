package com.lucascantao.mycrud.models.dto;

import com.lucascantao.mycrud.models.SubjectModel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@NoArgsConstructor
@Getter @Setter
public class SubjectDTO {
    private LocalDate data;
    private String nomeUsuario;
    private String category;
    private String assunto;
    private String description;


    public SubjectModel convertToModel(SubjectDTO dto) {
        SubjectModel model = new SubjectModel();
        model.setData(dto.getData());
        model.setNomeUsuario(dto.getNomeUsuario());
        model.setCategory(dto.getCategory());
        model.setAssunto(dto.getAssunto());
        model.setDescription(dto.getDescription());
        return model;
    }
}
