package com.example.soen343.model;


public class Registration {
    private String eventId;
    private String role; // "Learner", "Speaker", etc.

    public Registration() {}

    public Registration(String eventId, String role) {
        this.eventId = eventId;
        this.role = role;
    }

    public String getEventId() {
        return eventId;
    }

    public void setEventId(String eventId) {
        this.eventId = eventId;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}

