package com.example.soen343.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.soen343.model.Conversation;
import com.example.soen343.model.TinderMatch;
import com.example.soen343.observer.TinderObservable;
import com.example.soen343.repository.TinderMatchRepository;
import com.example.soen343.repository.UserRepository;

@Service
public class TinderMatchService {
    @Autowired
    private TinderObservable tinderObservable;
    @Autowired
    private TinderMatchRepository tinderMatchRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ConversationService conversationService;

    public String createTinderMatch(String senderUserId, String receiverUserId) {
        if (userRepository.existsById(senderUserId) && userRepository.existsById(receiverUserId)) {
            // Check if the match already exists
            List<TinderMatch> existingMatches = tinderMatchRepository
                    .findBySenderUserIdAndReceiverUserId(senderUserId, receiverUserId);
            if (!existingMatches.isEmpty()) {
                System.out.println("Existing Match found: " + existingMatches);
                return "Match already exists";
            }

            List<Conversation> existingConversations = conversationService.findByUserIds(senderUserId, receiverUserId);

            if (existingConversations.size() > 0) {
                System.out.println("Conversation already exists: " + existingConversations);
                return "Conversation already exists";
            }
            // Check if the reverse match exists
            existingMatches = tinderMatchRepository
                    .findBySenderUserIdAndReceiverUserIdAndIsRejectionFalse(receiverUserId, senderUserId);
            if (!existingMatches.isEmpty()) {
                System.out.println("Reverse match found: " + existingMatches);
                // Delete the reverse match
                TinderMatch reverseMatch = existingMatches.get(0);
                tinderMatchRepository.delete(reverseMatch);

                tinderObservable
                        .notifyObservers(createNotification(senderUserId, receiverUserId));

                return "Reverse match deleted and conversation created";
            }

            // Create a new match
            TinderMatch match = new TinderMatch(senderUserId, receiverUserId);
            tinderMatchRepository.save(match);
            return "New match created";
        } else {
            throw new IllegalArgumentException("One or both users do not exist");
        }
    }

    public String createTinderRejection(String senderUserId, String receiverUserId) {
        if (userRepository.existsById(senderUserId) && userRepository.existsById(receiverUserId)) {
            // Check if the match already exists
            List<TinderMatch> existingMatches = tinderMatchRepository
                    .findBySenderUserIdAndReceiverUserId(senderUserId, receiverUserId);
            if (!existingMatches.isEmpty()) {
                return "Match already exists";
            }

            // Create a new rejection
            TinderMatch rejection = new TinderMatch(senderUserId, receiverUserId, true);
            tinderMatchRepository.save(rejection);
            return "New rejection created";
        } else {
            throw new IllegalArgumentException("One or both users do not exist");
        }
    }

    private Map<String, String> createNotification(String senderUserId, String receiverUserId) {
        Map<String, String> notification = new HashMap<>();
        notification.put("senderUserId", senderUserId);
        notification.put("receiverUserId", receiverUserId);
        return notification;
    }
}
