package com.placement.backend.controller;

import com.placement.backend.service.AuthenticationService;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthenticationController {

    private final AuthenticationService authService;

    public AuthenticationController(AuthenticationService authService) {
        this.authService = authService;
    }

    @PostMapping("/signup")
    public Map<String, Object> signup(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String username = request.get("username");
        String password = request.get("password");

        return authService.signup(email, username, password);
    }

    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String password = request.get("password");

        return authService.login(email, password);
    }

    @GetMapping("/users")
    public List<Map<String, Object>> getAllUsers() {
        return authService.getAllUsers();
    }

    @GetMapping("/user/{username}")
    public Map<String, Object> getUserByUsername(@PathVariable String username) {
        Optional<com.placement.backend.model.User> userOpt = authService.getUserByUsername(username);
        
        if (userOpt.isPresent()) {
            com.placement.backend.model.User user = userOpt.get();
            return Map.of(
                "id", user.getId(),
                "email", user.getEmail(),
                "username", user.getUsername(),
                "role", user.getRole()
            );
        }
        
        return Map.of("error", "User not found");
    }
}
