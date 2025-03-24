package com.example.soen343.PaymentStrategyPattern.Implementation;

import com.example.soen343.PaymentStrategyPattern.Interface.DiscountStrategy;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component("percentageDiscountStrategy")
public class PercentageDiscountStrategy implements DiscountStrategy {

    @Value("${discount.percentage:10}")
    private double percentage;

    @Override
    public double applyDiscount(double amount) {
        return amount - (amount * (percentage / 100));
    }
}
