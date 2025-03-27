package com.example.soen343.service;

import com.example.soen343.model.Conversation;
import com.example.soen343.model.User;
import com.example.soen343.repository.ConversationRepository;
import com.example.soen343.repository.UserRepository;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ConversationService {
    @Autowired
    private ConversationRepository conversationRepository;

    public List<Conversation> findByUserId(String userId) {
        return conversationRepository.findByUserId(new ObjectId(userId));
    }

    public Conversation save(Conversation conversation) {
        return conversationRepository.save(conversation);
    }

    public Conversation createConversation(String userId1, String userId2) {
        Conversation conversation = new Conversation();
        conversation.setUserIds(List.of(userId1, userId2));
        return conversationRepository.save(conversation);
    }

}
