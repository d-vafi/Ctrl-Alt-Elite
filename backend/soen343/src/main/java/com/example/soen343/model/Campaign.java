package com.example.soen343.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;

@Document(collection = "campaign")
public class Campaign {
    @Id
    private String id;
    private String eventRef; // event_ref in DB
    private String type;
    private String title;
    private String description;
    private List<String> recipients;

    public Campaign() {}

    public Campaign(String eventRef, String type, String title, String description, List<String> recipients) {
        this.eventRef = eventRef;
        this.type = type;
        this.title = title;
        this.description = description;
        this.recipients = recipients;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getEventRef() { return eventRef; }
    public void setEventRef(String eventRef) { this.eventRef = eventRef; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public List<String> getRecipients() { return recipients; }
    public void setRecipients(List<String> recipients) { this.recipients = recipients; }
} 