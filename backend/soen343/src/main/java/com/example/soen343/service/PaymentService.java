package com.example.soen343.service;


import com.example.soen343.model.PaymentOrder;
import com.example.soen343.repository.PaymentRepository;
import com.example.soen343.PaymentStrategyPattern.Interface.DiscountStrategy;
import com.example.soen343.PaymentStrategyPattern.PaymentStrategy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Service;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private ApplicationContext applicationContext;

    public PaymentOrder processPayment(PaymentOrder order, String discountStrategyType, String paymentStrategyType) {

        // Retrieve the strategy beans by name (e.g., "noDiscountStrategy", "percentageDiscountStrategy")
        DiscountStrategy discountStrategy = (DiscountStrategy) applicationContext.getBean(discountStrategyType);
        PaymentStrategy paymentStrategy = (PaymentStrategy) applicationContext.getBean(paymentStrategyType);

        // Apply discount
        double discountedAmount = discountStrategy.applyDiscount(order.getAmount());
        order.setDiscountedAmount(discountedAmount);
        order.setDiscountType(discountStrategyType);
        order.setPaymentType(paymentStrategyType);

        // Process payment using the chosen strategy
        boolean paymentSuccess = paymentStrategy.processPayment(discountedAmount);
        if (paymentSuccess) {
            paymentRepository.save(order);
        }
        return order;
    }
    public PaymentOrder previewOrder(PaymentOrder order, String discountName, String paymentName) {
        DiscountStrategy discount = (DiscountStrategy) applicationContext.getBean(discountName);
        PaymentStrategy payment = (PaymentStrategy) applicationContext.getBean(paymentName);
    
        double discounted = discount.applyDiscount(order.getAmount());
    
        order.setDiscountedAmount(discounted);
        order.setDiscountType(discountName);
        order.setPaymentType(paymentName);
    
        return order;
    }
    
}

