package com.example.soen343.service;

import com.example.soen343.model.Conversation;
import com.example.soen343.model.Message;
import com.example.soen343.model.User;
import com.example.soen343.repository.ConversationRepository;
import com.example.soen343.repository.MessageRepository;
import com.example.soen343.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MessageService {
    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private UserRepository userRepository;

    public List<Message> findAllByConversationId(String conversationId) {
        return messageRepository.findAllByConversationId(conversationId);
    }

    public Message save(Message message) {
        return messageRepository.save(message);
    }

    public Message createMessage(String conversationId, User sender, String content) {
        Message message = new Message();
        message.setConversationId(conversationId);
        message.setSender(sender);
        message.setContent(content);
        message.setTimestamp(Long.toString(System.currentTimeMillis()));
        return messageRepository.save(message);
    }

    public Message createMessage(String conversationId, String senderId, String content) {
        User sender = userRepository.findById(senderId).orElse(null);
        if (sender == null) {
            return null;
        }
        return createMessage(conversationId, sender, content);
    }
}