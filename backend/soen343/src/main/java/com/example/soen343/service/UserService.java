package com.example.soen343.service;

import com.example.soen343.model.Event;
import com.example.soen343.model.Registration;
import com.example.soen343.model.User;
import com.example.soen343.repository.UserRepository;
import com.example.soen343.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EventRepository eventRepository;

    public Optional<User> findByUsernameAndPassword(String username, String password) {
        return userRepository.findByUsernameAndPassword(username, password);
    }

    public User registerUser(User user) {
        return userRepository.save(user);
    }

    public Map<String, Object> getUserProfile(String userId) {
        return userRepository.findById(userId).map(user -> {
            Map<String, Object> result = new HashMap<>();
            result.put("user", user);

            // Create enriched registeredEvents
            List<Map<String, Object>> enrichedEvents = user.getRegistrations().stream()
                    .map(reg -> {
                        Event event = eventRepository.findById(reg.getEventId()).orElse(null);
                        if (event == null) return null;
                        Map<String, Object> enriched = new HashMap<>();
                        enriched.put("id", event.getId());
                        enriched.put("title", event.getTitle());
                        enriched.put("description", event.getDescription());
                        enriched.put("price", event.getPrice());
                        enriched.put("date", event.getDate());
                        enriched.put("role", reg.getRole()); // <== this is the key!
                        return enriched;
                    })
                    .filter(Objects::nonNull)
                    .toList();

            result.put("registeredEvents", enrichedEvents);

            // Speaker invites remain the same
            result.put("speakerInvitations",
                    eventRepository.findAllById(user.getSpeakerInvitationIds()));

            return result;
        }).orElse(Collections.emptyMap());
    }

    public User updateUser(String userId, User updated) {
        return userRepository.findById(userId).map(user -> {
            user.setFullName(updated.getFullName());
            user.setEmail(updated.getEmail());
            user.setAffiliation(updated.getAffiliation());
            user.setProfession(updated.getProfession());
            user.setOrganization(updated.getOrganization());
            return userRepository.save(user);
        }).orElse(null);
    }

    public User registerToEvent(String userId, String eventId) {
        return userRepository.findById(userId).map(user -> {
            boolean alreadyRegistered = user.getRegistrations().stream()
                    .anyMatch(r -> r.getEventId().equals(eventId));
            if (!alreadyRegistered) {
                user.getRegistrations().add(new Registration(eventId, "Learner"));
                return userRepository.save(user);
            }
            return user;
        }).orElse(null);
    }

    public User cancelRegistration(String userId, String eventId) {
        return userRepository.findById(userId).map(user -> {
            user.getRegistrations().removeIf(r -> r.getEventId().equals(eventId));
            return userRepository.save(user);
        }).orElse(null);
    }

    public User acceptInvitation(String userId, String eventId) {
        return userRepository.findById(userId).map(user -> {
            if (user.getSpeakerInvitationIds().contains(eventId)) {
                user.getSpeakerInvitationIds().remove(eventId);

                boolean alreadyRegistered = user.getRegistrations().stream()
                        .anyMatch(r -> r.getEventId().equals(eventId));

                if (!alreadyRegistered) {
                    user.getRegistrations().add(new Registration(eventId, "Speaker"));
                }
                return userRepository.save(user);
            }
            return user;
        }).orElse(null);
    }

}