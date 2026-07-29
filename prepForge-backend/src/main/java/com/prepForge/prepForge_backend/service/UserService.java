package com.prepForge.prepForge_backend.service;

import com.prepForge.prepForge_backend.dto.LoginRequest;
import org.jspecify.annotations.NonNull;
import org.springframework.stereotype.Service;
import com.prepForge.prepForge_backend.dto.RegisterRequest;
import com.prepForge.prepForge_backend.entity.User;
import com.prepForge.prepForge_backend.repository.UserRepository;
import java.time.LocalDateTime;


@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public String register(RegisterRequest request) {
        if(userRepository.findByEmail(request.getEmail()).isPresent()) {
            return "Email already exists";
        }

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(request.getPassword())
                .createdAt(LocalDateTime.now())
                .build();

        userRepository.save(user);

        return "User Registered Successfully";
    }

    // Login service
    public String login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElse(null);

        if(user == null) {
            return "User not found";
        }

        if(!user.getPassword().equals(request.getPassword())) {
            return "Invalid password";
        }

        return "Login Successfull";
    }
}
