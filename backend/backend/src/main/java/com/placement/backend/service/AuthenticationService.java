package com.placement.backend.service;

import com.placement.backend.model.User;
import com.placement.backend.repository.UserRepository;
import org.springframework.stereotype.Service;
import java.util.*;
import java.util.regex.Pattern;

@Service
public class AuthenticationService {

    private final UserRepository userRepository;
    private static final String EMAIL_REGEX = "^[A-Za-z0-9+_.-]+@(.+)$";
    private static final String ADMIN_EMAIL = "ganapathim445@gmail.com";

    public AuthenticationService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * Validate email format
     */
    public boolean isValidEmail(String email) {
        return email != null && Pattern.compile(EMAIL_REGEX).matcher(email).matches();
    }

    /**
     * Sign up a new user
     */
    public Map<String, Object> signup(String email, String username, String password) {
        Map<String, Object> response = new HashMap<>();

        // Validation
        if (!isValidEmail(email)) {
            response.put("success", false);
            response.put("message", "Please enter a valid email address");
            return response;
        }

        if (username == null || username.trim().isEmpty()) {
            response.put("success", false);
            response.put("message", "Username cannot be empty");
            return response;
        }

        if (password == null || password.length() < 6) {
            response.put("success", false);
            response.put("message", "Password must be at least 6 characters");
            return response;
        }

        // Check if email already exists
        if (userRepository.findByEmail(email).isPresent()) {
            response.put("success", false);
            response.put("message", "Email already exists");
            return response;
        }

        // Check if username already exists
        if (userRepository.findByUsername(username).isPresent()) {
            response.put("success", false);
            response.put("message", "Username already exists");
            return response;
        }

        // Create new user
        User newUser = new User();
        newUser.setEmail(email);
        newUser.setUsername(username);
        newUser.setPassword(password); // In production, hash the password
        
        // Determine role based on email
        if (ADMIN_EMAIL.equalsIgnoreCase(email)) {
            newUser.setRole("admin");
        } else {
            newUser.setRole("user");
        }

        User savedUser = userRepository.save(newUser);

        response.put("success", true);
        response.put("message", "Signup successful");
        response.put("user", Map.of(
            "id", savedUser.getId(),
            "email", savedUser.getEmail(),
            "username", savedUser.getUsername(),
            "role", savedUser.getRole()
        ));

        return response;
    }

    /**
     * Login user
     */
    public Map<String, Object> login(String email, String password) {
        Map<String, Object> response = new HashMap<>();

        Optional<User> userOpt = userRepository.findByEmail(email);

        if (userOpt.isEmpty()) {
            response.put("success", false);
            response.put("message", "Invalid email or password");
            return response;
        }

        User user = userOpt.get();
        if (!user.getPassword().equals(password)) {
            response.put("success", false);
            response.put("message", "Invalid email or password");
            return response;
        }

        response.put("success", true);
        response.put("message", "Login successful");
        response.put("user", Map.of(
            "id", user.getId(),
            "email", user.getEmail(),
            "username", user.getUsername(),
            "role", user.getRole()
        ));

        return response;
    }

    /**
     * Get all users (for admin)
     */
    public List<Map<String, Object>> getAllUsers() {
        List<User> users = userRepository.findAll();
        List<Map<String, Object>> result = new ArrayList<>();

        for (User user : users) {
            result.add(Map.of(
                "id", user.getId(),
                "email", user.getEmail(),
                "username", user.getUsername(),
                "password", user.getPassword(),
                "role", user.getRole()
            ));
        }

        return result;
    }

    /**
     * Get user by username
     */
    public Optional<User> getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }
}
