package com.example.soen343.controller;

import com.example.soen343.model.PaymentOrder;
import com.example.soen343.service.PaymentService;
import com.example.soen343.repository.PaymentRepository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    private final PaymentRepository paymentRepository;

    @Autowired
    private PaymentService paymentService;

    PaymentController(PaymentRepository paymentRepository) {
        this.paymentRepository = paymentRepository;
    }

    @PostMapping("/process")
    public ResponseEntity<PaymentOrder> processPayment(
            @RequestBody PaymentOrder order,
            @RequestParam("discountStrategy") String discountStrategy,
            @RequestParam("paymentStrategy") String paymentStrategy) {

        PaymentOrder processedOrder = paymentService.processPayment(order, discountStrategy, paymentStrategy);
        return ResponseEntity.ok(processedOrder);
    }
    @PostMapping("/preview")
     public ResponseEntity<PaymentOrder> previewPayment(
        @RequestBody PaymentOrder order,
        @RequestParam("discountStrategy") String discountStrategy,
        @RequestParam("paymentStrategy") String paymentStrategy) {

    // Process logic without saving to DB
    PaymentOrder previewOrder = paymentService.previewOrder(order, discountStrategy, paymentStrategy);
    return ResponseEntity.ok(previewOrder);
}

}

