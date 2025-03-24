package com.example.soen343.PaymentStrategyPattern.Implementation;

import com.example.soen343.PaymentStrategyPattern.PaymentStrategy;

import org.springframework.stereotype.Component;

@Component("paypalPaymentStrategy")
public class PaypalPaymentStrategy implements PaymentStrategy {
    @Override
    public boolean processPayment(double amount) {
        // Implement PayPal payment logic (e.g., call external API)
        System.out.println("Processing PayPal payment for $" + amount);
        return true;
    }
}
