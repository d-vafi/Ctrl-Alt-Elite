package com.example.soen343.PaymentStrategyPattern.Implementation;

import com.example.soen343.PaymentStrategyPattern.PaymentStrategy;

import org.springframework.stereotype.Component;

@Component("creditCardPaymentStrategy")
public class CreditCardPaymentStrategy implements PaymentStrategy {
    @Override
    public boolean processPayment(double amount) {
        // Implement credit card payment logic (e.g., call external API)
        System.out.println("Processing credit card payment for $" + amount);
        return true;
    }
}
