package com.example.soen343.controller;

import com.example.soen343.model.User;
import com.example.soen343.repository.UserRepository;
import com.example.soen343.service.ConversationService;
import com.example.soen343.service.MessageService;
import com.example.soen343.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000") // Allows React to call API
@RestController
@RequestMapping("/api/message")
public class MessageController {
    @Autowired
    private MessageService messageService;

    @PostMapping("/create")
    public Map<String, Object> createMessage(@RequestBody Map<String, Object> data) {
        Map<String, Object> response = new HashMap<>();
        String conversationId = (String) data.get("conversationId");
        String senderId = (String) data.get("senderId");
        String content = (String) data.get("content");
        messageService.createMessage(conversationId, senderId, content);
        response.put("success", true);
        return response;
    }

    @GetMapping("/conversation/{conversationId}")
    public Map<String, Object> getMessagesByConversationId(@PathVariable String conversationId) {
        Map<String, Object> response = new HashMap<>();
        response.put("messages", messageService.findAllByConversationId(conversationId));
        response.put("success", true);
        return response;
    }
}