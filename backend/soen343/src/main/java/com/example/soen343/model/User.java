package com.example.soen343.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.*;

@Document(collection = "user")  // Maps to MongoDB collection
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class User {
    @Id
    private String id;
    private String username;
    private String password;
    private String type;  // "admin" or "user"
}