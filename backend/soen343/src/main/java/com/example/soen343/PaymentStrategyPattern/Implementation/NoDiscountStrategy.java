package com.example.soen343.PaymentStrategyPattern.Implementation;

import com.example.soen343.PaymentStrategyPattern.Interface.DiscountStrategy;

import org.springframework.stereotype.Component;

@Component("noDiscountStrategy")
public class NoDiscountStrategy implements DiscountStrategy {
    @Override
    public double applyDiscount(double amount) {
        return amount;
    }
}
