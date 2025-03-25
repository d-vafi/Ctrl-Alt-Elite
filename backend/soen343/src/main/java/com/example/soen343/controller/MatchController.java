package com.example.soen343.controller;

import com.example.soen343.factory.Implementation.EventMatchingFactory;
import com.example.soen343.factory.Interface.EventMatcher;
import com.example.soen343.model.Event;
import com.example.soen343.model.User;
import com.example.soen343.repository.EventRepository;
import com.example.soen343.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/match")
public class MatchController {

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/{userId}/{eventId}")
    public ResponseEntity<?> findMatch(@PathVariable String userId, @PathVariable String eventId) {
        Optional<Event> eventOpt = eventRepository.findById(eventId);
        Optional<User> userOpt = userRepository.findById(userId);

        if (eventOpt.isEmpty() || userOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Invalid User or Event");
        }

        Event event = eventOpt.get();
        User user = userOpt.get();
        List<User> usersAttending = List.of(
                new User("1", "John Doe", "john.doe@example.com", eventId, eventId),
                new User("2", "Jane Smith", "jane.smith@example.com", eventId, eventId));

        EventMatcher matcher = EventMatchingFactory.getMatcher(event.getTitle());
        Optional<User> match = matcher.findMatch(user, event, usersAttending);

        return match.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.of(Optional.empty()));
    }
}