package com.example.soen343.repository;

import com.example.soen343.model.Message;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MessageRepository extends MongoRepository<Message, String> {
    List<Message> findAllByConversationId(ObjectId conversationId);

    Optional<Message> findFirstByConversationIdOrderByTimestampDesc(ObjectId conversationId);

}