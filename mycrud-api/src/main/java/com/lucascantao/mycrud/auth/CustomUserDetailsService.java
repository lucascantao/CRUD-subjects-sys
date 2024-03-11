package com.lucascantao.mycrud.auth;

import java.util.Collection;
import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import com.lucascantao.mycrud.models.UsuarioModel;
import com.lucascantao.mycrud.repository.UserRepository;

@Component
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UsuarioModel usuario = userRepository.findByEmail(username).orElseThrow(() -> new UsernameNotFoundException("Email not found"));

        Collection<GrantedAuthority> grantedAuthorities = Collections.emptyList();

        return new User(usuario.getEmail(), usuario.getPassword(), grantedAuthorities);
    }
    
}
