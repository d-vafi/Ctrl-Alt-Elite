package com.example.soen343.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "orders")
public class PaymentOrder {
    @Id
    private String id;
    private double amount;
    private double discountedAmount;
    private String discountType;
    private String paymentType;
    private String eventId; 
    private String userId;


    // Constructors, Getters, and Setters
    public PaymentOrder() {}

    public PaymentOrder(double amount) {
        this.amount = amount;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public double getAmount() { return amount; }
    public void setAmount(double amount) { this.amount = amount; }

    public double getDiscountedAmount() { return discountedAmount; }
    public void setDiscountedAmount(double discountedAmount) { this.discountedAmount = discountedAmount; }

    public String getDiscountType() { return discountType; }
    public void setDiscountType(String discountType) { this.discountType = discountType; }

    public String getPaymentType() { return paymentType; }
    public void setPaymentType(String paymentType) { this.paymentType = paymentType; }

    public String getEventId() { return eventId; }
    public void setEventId(String eventId) { this.eventId = eventId; }

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

}

