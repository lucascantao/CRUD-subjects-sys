package com.lucascantao.mycrud.auth;

import java.io.IOException;

import org.apache.http.client.ClientProtocolException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lucascantao.mycrud.config.jwt.JWTGenerator;
import com.lucascantao.mycrud.models.UsuarioModel;
import com.lucascantao.mycrud.models.dto.AuthResponseDTO;
import com.lucascantao.mycrud.models.dto.LoginDTO;
import com.lucascantao.mycrud.models.dto.RegisterDTO;
import com.lucascantao.mycrud.models.dto.ResponseDTO;
import com.lucascantao.mycrud.repository.UserRepository;


@RestController
@RequestMapping("v1/auth")
public class AuthController {

    @Autowired
    UserRepository repository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    JWTGenerator jwtGenerator;


    @PostMapping("/authenticate")
    public ResponseEntity<AuthResponseDTO> authenticate(@RequestBody LoginDTO login) throws ClientProtocolException, IOException {
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(login.getUsername(), login.getPassword())
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = jwtGenerator.generateToken(authentication);
        return new ResponseEntity<>( new AuthResponseDTO(token), HttpStatus.OK);
    }

    
    @PostMapping("/register")
    public ResponseEntity<ResponseDTO> register(@RequestBody RegisterDTO register) {
        if (repository.existsByEmail(register.getEmail())) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }

        UsuarioModel user = new UsuarioModel();
        user.setName(register.getUsername());
        user.setEmail(register.getEmail());
        user.setPassword(passwordEncoder.encode(register.getPassword()));
        user = repository.save(user);
        ResponseDTO response = ResponseDTO.builder()
            .name(user.getName())
            .email(user.getEmail())
            .build();

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/validateUserToken")
    public ResponseEntity<ResponseDTO> validateUserByToken(@RequestHeader("Authorization") String header){
        String token = header.substring(7, header.length());
        if(jwtGenerator.validateToken(token)){
            String email = jwtGenerator.extractJwtUsername(token);
            UsuarioModel usuario = repository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("username not found"));
            ResponseDTO response = ResponseDTO.builder()
                    .name(usuario.getName())
                    .email(usuario.getEmail())
                    .build();
        
            return ResponseEntity.ok().body(response);
        }
        return ResponseEntity.badRequest().body(null);
    }
}
