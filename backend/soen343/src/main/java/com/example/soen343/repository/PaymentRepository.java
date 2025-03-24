package com.example.soen343.repository;

import com.example.soen343.model.PaymentOrder;



import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PaymentRepository extends MongoRepository<PaymentOrder, String> {
   
}
