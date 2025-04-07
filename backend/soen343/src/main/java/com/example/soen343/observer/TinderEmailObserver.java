package com.example.soen343.observer;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.soen343.model.Message;
import com.example.soen343.repository.UserRepository;
import com.example.soen343.service.EmailService;
import com.example.soen343.service.UserService;

@Service
public class TinderEmailObserver implements Observer {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailService emailService;

    private TinderObservable tinderObservable;

    @Autowired
    public void setTinderObservable(TinderObservable tinderObservable) {
        this.tinderObservable = tinderObservable;
        tinderObservable.addObserver(this);
    }

    @Override
    public void update(Object data) {
        if (data instanceof Map<?, ?>) {
            @SuppressWarnings("unchecked")
            Map<String, String> dataMap = (Map<String, String>) data;
            String senderUserId = dataMap.get("senderUserId");
            String receiverUserId = dataMap.get("receiverUserId");
            System.out.println("Sender User ID: " + senderUserId);
            System.out.println("Receiver User ID: " + receiverUserId);
            String senderEmail = userRepository.findById(senderUserId).map(user -> user.getEmail()).orElse(null);
            String receiverEmail = userRepository.findById(receiverUserId).map(user -> user.getEmail()).orElse(null);
            if (senderEmail != null && receiverEmail != null) {
                String subject = "New Match Notification";
                String content = "You have a new match with user ID: " + receiverUserId;
                emailService.sendEmail(subject, content, senderEmail);
                emailService.sendEmail(subject, content, receiverEmail);
                System.out.println("Email sent to: " + senderEmail + " and " + receiverEmail);
            } else {
                System.out.println("User email not found.");
            }
        }
    }
}
