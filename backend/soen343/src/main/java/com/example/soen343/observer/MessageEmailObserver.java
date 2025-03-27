package com.example.soen343.observer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.soen343.model.Message;
import com.example.soen343.service.EmailService;

@Service
public class MessageEmailObserver implements Observer {
    @Autowired
    private EmailService emailService;

    private MessageObservable messageObservable;

    @Autowired
    public void setMessageObservable(MessageObservable messageObservable) {
        this.messageObservable = messageObservable;
        messageObservable.addObserver(this);
    }

    @Override
    public void update(Object data) {
        if (data instanceof Message) {
            Message message = (Message) data;
            emailService.sendEmail("New Message", message.getContent(), "something@somewhere");
            System.out.println("Email sent with content: " + message.getContent());
        }
    }
}
