package com.example.soen343.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Document(collection = "tindermatch")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TinderMatch {
    @Id
    private String id;
    private String senderUserId;
    private String receiverUserId;
    private boolean isRejection;

    public TinderMatch(String senderUserId, String receiverUserId) {
        this.senderUserId = senderUserId;
        this.receiverUserId = receiverUserId;
        this.isRejection = false;
    }

    public TinderMatch(String senderUserId, String receiverUserId, boolean isRejection) {
        this.senderUserId = senderUserId;
        this.receiverUserId = receiverUserId;
        this.isRejection = isRejection;
    }
}
