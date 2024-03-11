package com.lucascantao.mycrud.repository;

import com.lucascantao.mycrud.models.SubjectModel;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface SubjectRepository extends JpaRepository<SubjectModel, Integer> {

    @Query(value = "select max(tcp.id) " +
            "from SubjectModel tcp " +
            "where tcp.ano = :ano ")
    String getSubjectModelBy(@Param("ano") String ano );
    Page<SubjectModel> findAllByAnoOrderByIdDesc(String ano, Pageable pageable);
}
