package com.example.soen343.controller;

import com.example.soen343.model.User;
import com.example.soen343.repository.UserRepository;
import com.example.soen343.service.ConversationService;
import com.example.soen343.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000") // Allows React to call API
@RestController
@RequestMapping("/api/conversation")
public class ConversationController {
    @Autowired
    private ConversationService conversationService;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/{userId}")
    public Map<String, Object> getConversation(@PathVariable String userId) {
        Map<String, Object> response = new HashMap<>();
        Optional<User> user = userRepository.findById(userId);
        if (user.isPresent()) {
            response.put("conversation", conversationService.findByUsers_Id(userId));
            response.put("success", true);
        } else {
            response.put("success", false);
        }

        return response;
    }

    @PostMapping("/createPrivateMessage")
    public Map<String, Object> createConversation(@RequestBody Map<String, Object> data) {
        Map<String, Object> response = new HashMap<>();
        String userId1 = (String) data.get("userId1");
        String userId2 = (String) data.get("userId2");
        conversationService.createConversationPrivateMessage(userId1, userId2);
        response.put("success", true);
        return response;
    }

    @PostMapping("/createGroup")
    public Map<String, Object> createGroup(@RequestBody Map<String, Object> data) {
        Map<String, Object> response = new HashMap<>();
        String userId1 = (String) data.get("userId1");
        String userId2 = (String) data.get("userId2");
        conversationService.createConversationGroup(userId1, userId2);
        response.put("success", true);
        return response;
    }
}