package com.example.soen343.controller;

import com.example.soen343.model.Message;
import com.example.soen343.model.User;
import com.example.soen343.repository.UserRepository;
import com.example.soen343.service.ConversationService;
import com.example.soen343.service.MessageService;
import com.example.soen343.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
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
        List<Message> messages = messageService.findAllByConversationId(conversationId);
        List<Map<String, Object>> messageList = new ArrayList<>();
        for (Message message : messages) {
            Map<String, Object> messageMap = new HashMap<>();
            messageMap.put("id", message.getId());
            messageMap.put("conversationId", message.getConversationId().toString());
            messageMap.put("senderId", message.getSenderId().toString()); // Only return the id of senderId
            messageMap.put("content", message.getContent());
            messageMap.put("timestamp", message.getTimestamp());
            messageList.add(messageMap);
        }
        response.put("messages", messageList);
        response.put("success", true);
        return response;
    }
}