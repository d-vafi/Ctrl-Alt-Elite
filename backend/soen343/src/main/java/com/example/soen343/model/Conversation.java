package com.example.soen343.model;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.example.soen343.dto.ConversationDTO;
import com.example.soen343.repository.UserRepository;

import lombok.*;

@Document(collection = "conversation") // Maps to MongoDB collection
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Conversation {
    @Id
    private String id;
    private List<String> userIds;
    private boolean isGroup;
    private String lastMessage;
    private String lastMessageSender;
    private String lastMessageTime;
}