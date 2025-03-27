package com.example.soen343.model;

import org.bson.types.ObjectId;
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
    private ObjectId conversationId;
    private ObjectId senderId;
    private String content;
    private String timestamp;
}