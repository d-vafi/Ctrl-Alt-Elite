package com.example.soen343.observer;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.soen343.model.Message;
import com.example.soen343.service.ConversationService;
import com.example.soen343.service.EmailService;

@Service
public class TinderConversationObserver implements Observer {
    @Autowired
    private ConversationService conversationService;

    private TinderObservable tinderObservable;

    @Autowired
    public void setTinderObservable(TinderObservable tinderObservable) {
        this.tinderObservable = tinderObservable;
        tinderObservable.addObserver(this);
    }

    @Override
    public void update(Object data) {
        System.out.println("TinderConversationObserver: update called with data: " + data);
        if (data instanceof Map<?, ?>) {
            @SuppressWarnings("unchecked")
            Map<String, String> dataMap = (Map<String, String>) data;
            String senderUserId = dataMap.get("senderUserId");
            String receiverUserId = dataMap.get("receiverUserId");

            conversationService.createConversation(senderUserId, receiverUserId);
            System.out.println("Conversation created between: " + senderUserId + " and " + receiverUserId);
        }
    }
}
