package com.example.soen343.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendCampaignEmail(String title, String body, List<String> recipients) {
        for (String recipient : recipients) {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(recipient);
            message.setSubject(title);
            message.setText(body);
            mailSender.send(message);
        }
    }

    public void sendEmail(String title, String body, String recipient) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(recipient);
        message.setSubject(title);
        message.setText(body);
        mailSender.send(message);
    }
}
