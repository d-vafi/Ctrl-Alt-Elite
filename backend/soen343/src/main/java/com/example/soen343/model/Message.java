package com.example.soen343.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.*;

@Document(collection = "message") // Maps to MongoDB collection
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Message {
    @Id
    private String id;
    private String ConversationId;
    private User sender;
    private String content;
    private String timestamp;
}