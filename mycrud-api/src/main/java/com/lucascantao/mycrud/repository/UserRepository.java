package com.lucascantao.mycrud.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lucascantao.mycrud.models.UsuarioModel;

public interface UserRepository extends JpaRepository<UsuarioModel, Integer>{
    Optional<UsuarioModel> findByEmail(String email);
    boolean existsByEmail(String email);
}
