package com.example.soen343.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.soen343.service.TinderMatchService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/tindermatch")
public class TinderMatchController {

    @Autowired
    TinderMatchService tinderMatchService;

    @PostMapping("/create")
    public String createTinderMatch(@RequestBody Map<String, Object> data) {
        System.out.println(data);
        String senderUserId = (String) data.get("senderUserId");
        String receiverUserId = (String) data.get("receiverUserId");
        if (senderUserId == null || receiverUserId == null) {
            return "Sender or receiver user ID is missing";
        }
        return tinderMatchService.createTinderMatch(senderUserId, receiverUserId);
    }

    @PostMapping("/reject")
    public String createTinderRejection(@RequestBody Map<String, Object> data) {
        String senderUserId = (String) data.get("senderUserId");
        String receiverUserId = (String) data.get("receiverUserId");
        if (senderUserId == null || receiverUserId == null) {
            return "Sender or receiver user ID is missing";
        }
        return tinderMatchService.createTinderRejection(senderUserId, receiverUserId);
    }
}
