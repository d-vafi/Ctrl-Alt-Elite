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
        return user.isPresent();  // Returns true if an admin user is found
    }

    public User registerUser(User user) {
        return userRepository.save(user);
    }
}