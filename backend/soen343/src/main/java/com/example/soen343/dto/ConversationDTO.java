package com.example.soen343.dto;

import java.util.HashMap;
import java.util.List;

import org.springframework.data.annotation.Id;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ConversationDTO {
    @Id
    private String id;
    private HashMap<String, String> users;
    private String lastMessage;
    private String lastMessageSender;
    private String lastMessageTime;
}
