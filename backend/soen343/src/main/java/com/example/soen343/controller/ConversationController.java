package com.example.soen343.controller;

import com.example.soen343.dto.ConversationDTO;
import com.example.soen343.mapper.ConversationMapper;
import com.example.soen343.model.Conversation;
import com.example.soen343.model.Message;
import com.example.soen343.model.User;
import com.example.soen343.repository.UserRepository;
import com.example.soen343.service.ConversationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
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

    @Autowired
    private ConversationMapper mapper;

    @GetMapping("/{userId}")
    public Map<String, Object> getConversation(@PathVariable String userId) {
        Map<String, Object> response = new HashMap<>();
        Optional<User> user = userRepository.findById(userId);
        ArrayList<ConversationDTO> conversationDTOs = new ArrayList<ConversationDTO>();
        if (user.isPresent()) {
            List<Conversation> conversations = conversationService.findByUserId(userId);
            for (Conversation conversation : conversations) {
                conversationDTOs.add(mapper.toDTO(conversation));
            }
            conversationDTOs.sort((c1, c2) -> {
                if (c1.getLastMessageTime() == null) {
                    return 1;
                } else if (c2.getLastMessageTime() == null) {
                    return -1;
                } else {
                    return c2.getLastMessageTime().compareTo(c1.getLastMessageTime());
                }
            });
            response.put("conversations", conversationDTOs);
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
        conversationService.createConversation(userId1, userId2);
        response.put("success", true);
        return response;
    }

    @PostMapping("/addUser")
    public Map<String, Object> addUserToConversation(@RequestBody Map<String, Object> data) {
        Map<String, Object> response = new HashMap<>();
        String conversationId = (String) data.get("conversationId");
        String userId = (String) data.get("userId");
        conversationService.addUserToConversation(conversationId, userId);
        response.put("success", true);
        return response;
    }

    @GetMapping("/getAllMessagesAndPolls/{conversationId}")
    public Map<String, Object> getAllMessagesAndPolls(@PathVariable String conversationId) {
        Map<String, Object> response = new HashMap<>();
        HashMap<String, Object> allMessages = conversationService.getAllMessagesAndPolls(conversationId);

        // Cast messages and polls to List<Map<String, Object>>
        List<Map<String, Object>> messages = (List<Map<String, Object>>) allMessages.get("messages");
        List<Map<String, Object>> polls = (List<Map<String, Object>>) allMessages.get("polls");

        List<Map<String, Object>> messageList = new ArrayList<>();

        // Merge messages and polls based on their timestamps
        int messageIndex = 0, pollIndex = 0;
        while (messageIndex < messages.size() && pollIndex < polls.size()) {
            long messageTimestamp = Long.parseLong(messages.get(messageIndex).get("timestamp").toString());
            long pollTimestamp = Long.parseLong(polls.get(pollIndex).get("timestamp").toString());

            if (messageTimestamp < pollTimestamp) {
                messageList.add(messages.get(messageIndex));
                messageIndex++;
            } else {
                messageList.add(polls.get(pollIndex));
                pollIndex++;
            }
        }

        // Add remaining messages and polls
        while (messageIndex < messages.size()) {
            messageList.add(messages.get(messageIndex));
            messageIndex++;
        }
        while (pollIndex < polls.size()) {
            messageList.add(polls.get(pollIndex));
            pollIndex++;
        }

        response.put("messages", messageList);
        return response;
    }
}