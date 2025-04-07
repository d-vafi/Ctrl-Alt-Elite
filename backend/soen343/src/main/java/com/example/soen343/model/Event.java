package com.example.soen343.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Document(collection = "event")
public class Event {
    @Id
    private String id;
    private String title;
    private String description;
    private double price;
    private String date;

    private List<Sponsorship> sponsorships = new ArrayList<>();
    private boolean acceptsSponsorship = true;             // Default to true
    // Constructors
    public Event() {}



    public Event(String title, String description, double price, String date) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.date = date;
    }

    // Getters and setters
    public String getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setDescription(String description) {
        this.description = description;
    }
    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public boolean isAcceptsSponsorship() {
        return acceptsSponsorship;
    }

    public void setAcceptsSponsorship(boolean acceptsSponsorship) {
        this.acceptsSponsorship = acceptsSponsorship;
    }

    public List<Sponsorship> getSponsorships() {
        return sponsorships;
    }

    public void setSponsorships(List<Sponsorship> sponsorships) {
        this.sponsorships = sponsorships;
    }
}
