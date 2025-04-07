package com.example.soen343.controller;

import com.example.soen343.model.Event;
import com.example.soen343.model.Sponsorship;
import com.example.soen343.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/events")
public class EventController {

    @Autowired
    private EventRepository eventRepository;

    @GetMapping
    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }
    @GetMapping("/{id}")
    public ResponseEntity<Event> getEventById(@PathVariable String id) {
        Event event = eventRepository.findById(id).orElse(null);
    
        if (event == null) {
            return ResponseEntity.notFound().build();
        }
    
        return ResponseEntity.ok(event);
    }

    // ✅ GET all events open to sponsorship
    @GetMapping("/needs-sponsorship")
    public List<Event> getEventsNeedingSponsorship() {
        return eventRepository.findByAcceptsSponsorshipTrue();
    }

    @PostMapping("/{eventId}/sponsor")
    public Event sponsorEvent(@PathVariable String eventId, @RequestBody Sponsorship sponsorship) {
        Optional<Event> opt = eventRepository.findById(eventId);

        if (opt.isPresent()) {
            Event event = opt.get();

            // Optional: avoid duplicate sponsorships
            boolean alreadySponsored = event.getSponsorships().stream()
                    .anyMatch(s -> s.getOrganizationId().equals(sponsorship.getOrganizationId()));

            if (!alreadySponsored) {
                event.getSponsorships().add(sponsorship);
                return eventRepository.save(event);
            }
        }
        return null; // or throw appropriate exception
    }

    @GetMapping("/sponsored-by/{orgId}")
    public List<Event> getEventsSponsoredBy(@PathVariable String orgId) {
        return eventRepository.findBySponsorships_OrganizationId(orgId);
    }
}
    


