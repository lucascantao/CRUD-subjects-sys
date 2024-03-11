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
    private String ano;
    private String assunto;
    private String destino;
    private String nomeUsuario;
    private String processoDoc;
    private String observacoes;


    public SubjectModel convertToModel(SubjectDTO dto) {
        SubjectModel model = new SubjectModel();
        model.setData(dto.getData());
        model.setAno(dto.getAno());
        model.setNomeUsuario(dto.getNomeUsuario());
        model.setDestino(dto.getDestino());
        model.setProcessoDoc(dto.getProcessoDoc());
        model.setAssunto(dto.getAssunto());
        model.setObservacoes(dto.getObservacoes());
        return model;
    }
}
