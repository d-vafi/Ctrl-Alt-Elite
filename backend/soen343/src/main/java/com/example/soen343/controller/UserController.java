package com.example.soen343.controller;

import com.example.soen343.model.Event;
import com.example.soen343.model.User;
import com.example.soen343.repository.EventRepository;
import com.example.soen343.repository.UserRepository;
import com.example.soen343.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/me")
    public Map<String, Object> getProfile(@RequestParam String userId) {
        return userService.getUserProfile(userId);
    }

    @PutMapping("/me")
    public User updateProfile(@RequestParam String userId, @RequestBody User updated) {
        return userService.updateUser(userId, updated);
    }

    @PostMapping("/registerEvent")
    public User registerToEvent(@RequestParam String userId, @RequestParam String eventId) {
        return userService.registerToEvent(userId, eventId);
    }

    @DeleteMapping("/registrations/{eventId}")
    public User cancelRegistration(@RequestParam String userId, @PathVariable String eventId) {
        return userService.cancelRegistration(userId, eventId);
    }

    @PostMapping("/invitations/{eventId}/accept")
    public User acceptInvite(@RequestParam String userId, @PathVariable String eventId) {
        return userService.acceptInvitation(userId, eventId);
    }
}