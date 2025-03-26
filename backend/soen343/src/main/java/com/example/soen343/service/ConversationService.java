package com.example.soen343.service;

import com.example.soen343.model.Conversation;
import com.example.soen343.model.User;
import com.example.soen343.repository.ConversationRepository;
import com.example.soen343.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ConversationService {
    @Autowired
    private ConversationRepository conversationRepository;

    public List<Conversation> findByUsers_Id(String userId) {
        return conversationRepository.findByUsers_Id(userId);
    }

    public Conversation save(Conversation conversation) {
        return conversationRepository.save(conversation);
    }

    public Conversation createConversationGroup(String userId1, String userId2) {
        Conversation conversation = new Conversation();
        conversation.setUserIds(List.of(userId1, userId2));
        conversation.setGroup(true);
        return conversationRepository.save(conversation);
    }

    public Conversation createConversationPrivateMessage(String userId1, String userId2) {
        List<Conversation> conversations = conversationRepository.findByUsers_Id(userId1);
        for (Conversation conversation : conversations) {
            if (conversation.getUserIds().contains(userId2) && !conversation.isGroup()) {
                return conversation;
            }
        }
        Conversation conversation = new Conversation();
        conversation.setUserIds(List.of(userId1, userId2));
        conversation.setGroup(false);
        return conversationRepository.save(conversation);
    }

}
