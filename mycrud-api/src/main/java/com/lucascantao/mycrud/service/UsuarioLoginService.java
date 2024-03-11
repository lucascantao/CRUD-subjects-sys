package com.lucascantao.mycrud.service;

import java.io.IOException;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.mime.MultipartEntityBuilder;
import org.apache.http.impl.client.HttpClients;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.lucascantao.mycrud.models.dto.LoginDTO;
import com.lucascantao.mycrud.models.dto.ResponseDTO;

@Service
public class UsuarioLoginService {

    String URL = "http://192.168.0.95/ws/get.php";

    public ResponseDTO getUsuario(LoginDTO login) throws ClientProtocolException, IOException {
        
        HttpClient httpClient = HttpClients.createDefault();
        HttpPost httpPost = new HttpPost(URL);
        HttpEntity multipartEntity = MultipartEntityBuilder.create()
                .addTextBody("username", login.getUsername())
                .addTextBody("password", login.getPassword())
                .build();

        httpPost.setEntity(multipartEntity);

        HttpResponse response = httpClient.execute(httpPost);

        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonResponse = objectMapper.readTree(response.getEntity().getContent());

        boolean success = jsonResponse.get("success").asBoolean();
        // String message = jsonResponse.get("message").asText();

        if(success) {
            JsonNode data = jsonResponse.get("dados");

            ResponseDTO usuario = ResponseDTO.builder()
            // .login(data.get("login").asText())
            .name(data.get("name").asText())
            // .descricao(data.get("descricao").asText())
            .email(data.get("email").asText())
            .build();
            
            return usuario;
            
        } else {
            return null;
        }
    }
    
}
