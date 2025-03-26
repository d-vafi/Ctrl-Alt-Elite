package com.example.soen343.repository;

import com.example.soen343.model.Conversation;
import com.example.soen343.model.User;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ConversationRepository extends MongoRepository<Conversation, String> {
    @Query("SELECT c FROM Conversation c WHERE :userId IN (SELECT u.id FROM User u WHERE u IN c.users)")
    public List<Conversation> findByUserId(String userId);
}