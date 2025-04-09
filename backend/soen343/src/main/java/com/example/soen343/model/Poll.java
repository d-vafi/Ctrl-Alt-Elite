package com.example.soen343.model;

import java.util.HashMap;
import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.*;

@Document(collection = "polls") // Maps to MongoDB collection
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Poll {
    @Id
    private String id;
    private ObjectId conversationId;
    private ObjectId senderId;
    private String title;
    private String timestamp;
    private boolean isMultiselect;
    private HashMap<String, VoteOption> votes;
    private String startTime;
    private String endTime;
    private boolean isClosed;

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class VoteOption {
        private String option;
        private List<String> votes;

    }
}