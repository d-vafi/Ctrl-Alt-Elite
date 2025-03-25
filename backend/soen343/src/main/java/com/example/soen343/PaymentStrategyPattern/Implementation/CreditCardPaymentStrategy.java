package com.example.soen343.PaymentStrategyPattern.Implementation;

import com.example.soen343.PaymentStrategyPattern.PaymentStrategy;

import org.springframework.stereotype.Component;

@Component("creditCardPaymentStrategy")
public class CreditCardPaymentStrategy implements PaymentStrategy {
    @Override
    public boolean processPayment(double amount) {
        System.out.println("Processing credit card payment for $" + amount);
        System.out.println("Paid Successfully!");
        return true;
    }
}
