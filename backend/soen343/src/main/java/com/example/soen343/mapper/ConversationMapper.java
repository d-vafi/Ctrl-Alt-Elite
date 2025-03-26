package com.example.soen343.mapper;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.soen343.model.Conversation;
import com.example.soen343.model.User;
import com.example.soen343.repository.UserRepository;

import lombok.Getter;
import lombok.Setter;

import com.example.soen343.dto.ConversationDTO;

@Service
@Getter
@Setter
public class ConversationMapper {

    @Autowired
    private UserRepository userRepository;

    public ConversationDTO toDTO(Conversation conversation) {
        ConversationDTO dto = new ConversationDTO();
        dto.setId(conversation.getId());
        dto.setGroup(conversation.isGroup());
        dto.setLastMessage(conversation.getLastMessage());
        dto.setLastMessageSender(conversation.getLastMessageSender());
        dto.setLastMessageTime(conversation.getLastMessageTime());
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
