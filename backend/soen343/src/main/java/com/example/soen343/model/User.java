package com.example.soen343.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Document(collection = "user")  // Maps to MongoDB collection
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class User {
    @Id
    private String id;
    private String username;
    private String password;
    private String type;  // "admin" or "user"
    private String email;  // 👈 Add this line

    // Profile info
    private String fullName;
    private String affiliation;
    private String profession;
    private String organization;

    // Store event references only
    private List<Registration> registrations = new ArrayList<>();
    private List<String> speakerInvitationIds = new ArrayList<>();
}