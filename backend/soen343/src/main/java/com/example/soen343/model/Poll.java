package com.example.soen343.model;

import java.util.HashMap;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.*;

@Document(collection = "polls") // Maps to MongoDB collection
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Poll extends Message {
    private boolean isMultiselect;
    private HashMap<String, String> votes;
    private String startTime;
    private String endTime;
    private boolean isClosed;
}