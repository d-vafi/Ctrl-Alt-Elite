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

    @Autowired
    private UserRepository userRepository;

    public List<Conversation> findByUsers_Id(String userId) {
        return conversationRepository.findByUsers_Id(userId);
    }

    public Conversation save(Conversation conversation) {
        return conversationRepository.save(conversation);
    }

    public Conversation createConversationGroup(User user1, User user2) {
        Conversation conversation = new Conversation();
        conversation.setUsers(List.of(user1, user2));
        conversation.setGroup(true);
        return conversationRepository.save(conversation);
    }

    public Conversation createConversationGroup(String userId1, String userId2) {
        Optional<User> user1 = userRepository.findById(userId1);
        Optional<User> user2 = userRepository.findById(userId2);
        if (user1.isPresent() && user2.isPresent()) {
            return createConversationGroup(user1.get(), user2.get());
        }
        return null;
    }

    public Conversation createConversationPrivateMessage(User user1, User user2) {
        List<Conversation> conversations = conversationRepository.findByUsers_Id(user1.getId());
        for (Conversation conversation : conversations) {
            if (conversation.getUsers().contains(user2) && !conversation.isGroup()) {
                return conversation;
            }
        }
        Conversation conversation = new Conversation();
        conversation.setUsers(List.of(user1, user2));
        conversation.setGroup(false);
        return conversationRepository.save(conversation);
    }

    public Conversation createConversationPrivateMessage(String userId1, String userId2) {
        Optional<User> user1 = userRepository.findById(userId1);
        Optional<User> user2 = userRepository.findById(userId2);
        if (user1.isPresent() && user2.isPresent()) {
            return createConversationPrivateMessage(user1.get(), user2.get());
        }
        return null;
    }
}
