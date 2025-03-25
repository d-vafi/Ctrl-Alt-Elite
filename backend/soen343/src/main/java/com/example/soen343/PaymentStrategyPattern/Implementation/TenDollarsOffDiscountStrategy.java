package com.example.soen343.PaymentStrategyPattern.Implementation;


import com.example.soen343.PaymentStrategyPattern.Interface.DiscountStrategy;
import org.springframework.stereotype.Component;

@Component("tenDollarsOffDiscountStrategy")
public class TenDollarsOffDiscountStrategy implements DiscountStrategy {

    @Override
    public double applyDiscount(double amount) {
        double discounted = amount - 10.0;
        return discounted > 0 ? discounted : 0; 
    }
}
