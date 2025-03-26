package com.example.soen343.model;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.*;

@Document(collection = "conversation") // Maps to MongoDB collection
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Conversation {
    @Id
    private String id;
    private List<User> users;
    private boolean isGroup;
    private String lastMessage;
    private String lastMessageSender;
    private String lastMessageTime;
}