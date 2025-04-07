package com.example.soen343.controller;

import com.example.soen343.model.User;
import com.example.soen343.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000") // Allows React to call API
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private UserService userService;

    @PostMapping("/eventlogin")
    public Map<String, String> login(@RequestBody User loginRequest) {
        System.out.println("Received login request: " + loginRequest.getUsername());

        Optional<User> userOpt = userService.findByUsernameAndPassword(loginRequest.getUsername(),
                loginRequest.getPassword());
        Map<String, String> response = new HashMap<>();

        if (userOpt.isPresent()) {
            User user = userOpt.get();
            response.put("message", "Login successful");
            response.put("status", "success");
            response.put("type", user.getType());
            if ("user".equals(user.getType())) {
                response.put("email", user.getEmail()); // Add this line
            }
        }

        return response;
    }

    @PostMapping("/register")
    public User registerUser(@RequestBody User user) {
        return userService.registerUser(user);
    }

    @PostMapping("/login")
    public Map<String, String> loginUser(@RequestBody User loginRequest) {
        Optional<User> userOpt = userService.findByUsernameAndPassword(loginRequest.getUsername(),
                loginRequest.getPassword());
        Map<String, String> response = new HashMap<>();

        if (userOpt.isPresent()) {
            response.put("message", "Login successful");
            response.put("status", "success");
            response.put("username", loginRequest.getUsername());
            response.put("userId", userOpt.get().getId());
        } else {
            response.put("message", "Invalid credentials");
            response.put("status", "error");
        }

        return response;
    }

}