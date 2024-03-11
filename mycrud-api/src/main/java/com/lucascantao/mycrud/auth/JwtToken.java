package com.lucascantao.mycrud.auth;

import lombok.Data;
import lombok.Getter;

@Data
@Getter
public class JwtToken {
    private String accessToken;
    private String type = "Bearer";

    public void setToken(String token) {
        this.accessToken = token;
    }
    
}
