package com.example.soen343.mapper;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.soen343.model.Conversation;
import com.example.soen343.model.Message;
import com.example.soen343.model.User;
import com.example.soen343.repository.MessageRepository;
import com.example.soen343.repository.UserRepository;
import com.example.soen343.service.MessageService;

import lombok.Getter;
import lombok.Setter;

import com.example.soen343.dto.ConversationDTO;

@Service
@Getter
@Setter
public class ConversationMapper {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MessageService messageService;

    public ConversationDTO toDTO(Conversation conversation) {
        ConversationDTO dto = new ConversationDTO();
        dto.setId(conversation.getId());
        Message lastMessage = messageService.findFirstByConversationIdOrderByTimestampDesc(conversation.getId())
                .orElse(null);
        if (lastMessage != null) {
            dto.setLastMessage(lastMessage.getContent());
            dto.setLastMessageTime(lastMessage.getTimestamp());
            dto.setLastMessageSender(lastMessage.getSenderId().toString());
        } else {
            System.out.println("No messages found for conversation " + conversation.getId());
            dto.setLastMessage(null);
            dto.setLastMessageTime(null);
            dto.setLastMessageSender(null);
        }
        HashMap<String, String> users = new HashMap<>();
        for (String userId : conversation.getUserIds()) {

            User user = userRepository.findById(userId).orElse(null);
            if (user != null) {
                users.put(user.getId(), user.getUsername());
            }

        }
        dto.setUsers(users);
        return dto;
    }
}
