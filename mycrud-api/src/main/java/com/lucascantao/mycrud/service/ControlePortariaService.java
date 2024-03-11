package com.lucascantao.mycrud.service;

import com.lucascantao.mycrud.config.exception.ApiException;
import com.lucascantao.mycrud.models.SubjectModel;
import com.lucascantao.mycrud.models.dto.SubjectDTO;
import com.lucascantao.mycrud.repository.SubjectRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ControlePortariaService{

    @Autowired
    private SubjectRepository repo;


    public List<SubjectModel> getList() {
        return repo.findAll();
    }

    public SubjectModel find(int id) {
        Optional<SubjectModel> model = repo.findById(id);
        if(!model.isPresent()) {
            throw new ApiException("Controle não encontrado",404);
        }
        return model.get();
    }

    public Page<SubjectModel> getListAno(String ano, int page){
        Page<SubjectModel> list = repo.findAllByAnoOrderByIdDesc(ano, PageRequest.of(page, 10));
        if(list.isEmpty()){
            return Page.empty();
        }
            return list;
    }

    public SubjectModel addSubject(SubjectDTO dto){
            SubjectModel model = dto.convertToModel(dto);
            return repo.save(model);
    }

    public void editarJubject(SubjectModel subjectModel) {
        repo.save(subjectModel);
    } 

}
