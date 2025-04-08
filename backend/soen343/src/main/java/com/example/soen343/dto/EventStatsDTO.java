package com.example.soen343.dto;


import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class EventStatsDTO {
    private String eventTitle;
    private String eventId;
    private double sponsorships;
    private double ticketRevenue;
    private int registeredUsers;
    private double netProfit;
    private double rentCost;
    private double foodCost;

}