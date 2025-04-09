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
    private String organizerId;
    private double rentCost = 0;
    private double foodCost = 0;

    private List<String> speakers = new ArrayList<>();

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

    public String getOrganizerId() { return organizerId; }
 
    public void setOrganizerId(String organizerId) {
        this.organizerId = organizerId;
    }


    public Double getRentCost(){
        return rentCost;
    }

    public void setRentCost(double rentCost){
        this.rentCost = rentCost;
    }
    public Double getFoodCost(){
        return foodCost;
    }

    public void setFoodCost(double foodCost){
        this.foodCost = foodCost;
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

    public List<String> getSpeakers() {
        return speakers;
    }
    
    public void setSpeakers(List<String> speakers) {
        this.speakers = speakers;
    }
}
