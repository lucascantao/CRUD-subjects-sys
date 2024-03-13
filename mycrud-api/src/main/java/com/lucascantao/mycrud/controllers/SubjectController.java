package com.lucascantao.mycrud.controllers;

import com.lucascantao.mycrud.models.SubjectModel;
import com.lucascantao.mycrud.models.dto.SubjectDTO;
import com.lucascantao.mycrud.service.ControlePortariaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("v1/subject")
public class SubjectController {

    @Autowired
    private ControlePortariaService service;

    @GetMapping()
    public ResponseEntity<SubjectModel> getControle(@RequestParam int id){
        return ResponseEntity.ok().body(service.find(id));
    }

    @GetMapping("/category")
    public ResponseEntity<Page<SubjectModel>> getListCategory(@RequestParam String category, int page){
        return ResponseEntity.ok(service.getListCategory(category, page));
    }

    @PostMapping()
    public ResponseEntity<SubjectModel> addControle(@RequestBody SubjectDTO dto){
        SubjectModel result = service.addSubject(dto);
        return ResponseEntity.ok(result);
    }

    @PutMapping()
    public ResponseEntity<String> editControle(@RequestBody SubjectModel id) {
        service.editarJubject(id);
        return ResponseEntity.ok("assunto salvo");
    }
}
