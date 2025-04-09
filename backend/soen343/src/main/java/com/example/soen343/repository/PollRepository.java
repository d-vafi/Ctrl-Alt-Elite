package com.example.soen343.repository;

import com.example.soen343.model.Message;
import com.example.soen343.model.Poll;

import org.bson.types.ObjectId;
import org.springframework.boot.autoconfigure.data.web.SpringDataWebProperties.Sort;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.web.SortDefault;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PollRepository extends MongoRepository<Poll, String> {

    List<Poll> findAllByConversationIdOrderByTimestampAsc(ObjectId conversationId);

}