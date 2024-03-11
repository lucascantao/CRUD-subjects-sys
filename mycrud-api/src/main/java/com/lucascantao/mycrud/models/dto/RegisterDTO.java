package com.lucascantao.mycrud.models.dto;

import lombok.Data;
import lombok.Getter;

@Data
@Getter
public class RegisterDTO {

    private String name;
    private String email;
    private String password;
    
}
