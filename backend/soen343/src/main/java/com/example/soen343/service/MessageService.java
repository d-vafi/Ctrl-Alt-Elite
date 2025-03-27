package com.example.soen343.service;

import com.example.soen343.model.Conversation;
import com.example.soen343.model.Message;
import com.example.soen343.model.User;
import com.example.soen343.observer.MessageEmailObserver;
import com.example.soen343.observer.MessageObservable;
import com.example.soen343.repository.ConversationRepository;
import com.example.soen343.repository.MessageRepository;
import com.example.soen343.repository.UserRepository;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MessageService {
    @Autowired
    private MessageObservable messageObservable;
    @Autowired
    private MessageRepository messageRepository;

    public List<Message> findAllByConversationId(String conversationId) {
        return messageRepository.findAllByConversationIdOrderByTimestampAsc(new ObjectId(conversationId));
    }

    public Optional<Message> findFirstByConversationIdOrderByTimestampDesc(String conversationId) {
        return messageRepository.findFirstByConversationIdOrderByTimestampDesc(new ObjectId(conversationId));
    }

    public Message createMessage(String conversationId, String senderId, String content) {
        Message message = new Message();
        message.setConversationId(new ObjectId(conversationId));
        message.setSenderId(new ObjectId(senderId));
        message.setContent(content);
        message.setTimestamp(Long.toString(System.currentTimeMillis() / 1000));
        message = messageRepository.save(message);
        messageObservable.notifyObservers(message);
        return message;
    }
}