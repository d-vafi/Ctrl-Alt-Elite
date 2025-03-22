package com.example.soen343.service;

import com.example.soen343.model.User;
import com.example.soen343.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public boolean authenticateAdmin(String username, String password) {
        Optional<User> user = userRepository.findByUsernameAndPasswordAndType(username, password, "admin");
        System.out.println(userRepository.findAll());
        if (user.isPresent()) {
            System.out.println("Admin login successful for: " + username);
        } else {
            System.out.println("Admin login failed for: " + username);
        }
        return user.isPresent();
    }

    public User registerUser(User user) {
        return userRepository.save(user);
    }
}