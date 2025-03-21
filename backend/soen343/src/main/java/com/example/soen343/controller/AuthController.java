package com.example.soen343.controller;

import com.example.soen343.model.User;
import com.example.soen343.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

// @CrossOrigin(origins = "http://localhost:3000") // Allows React to call API
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private UserService userService;

    @PostMapping("/eventlogin")
    public Map<String, String> login(@RequestBody User loginRequest) {
        System.out.println("Received login request: " + loginRequest.getUsername());
    
        boolean isAuthenticated = userService.authenticateAdmin(loginRequest.getUsername(), loginRequest.getPassword());
        Map<String, String> response = new HashMap<>();
    
        if (isAuthenticated) {
            response.put("message", "Login successful");
            response.put("status", "success");
        } else {
            response.put("message", "Invalid credentials or not an admin");
            response.put("status", "failure");
        }
    
        return response;
    }

    @PostMapping("/register")
    public User registerUser(@RequestBody User user) {
        return userService.registerUser(user);
    }
}