package com.example.soen343.controller;

import com.example.soen343.model.PaymentOrder;
import com.example.soen343.model.Event;
import com.example.soen343.model.Sponsorship;
import com.example.soen343.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.soen343.dto.EventStatsDTO;
import com.example.soen343.repository.PaymentRepository;
import java.util.ArrayList;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/events")
public class EventController {

    @Autowired
    private EventRepository eventRepository;
    @Autowired
     private PaymentRepository paymentRepository;

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

    @PostMapping("/create")
    public ResponseEntity<Event> createEvent(@RequestBody Event event) {
        Event savedEvent = eventRepository.save(event);
        return ResponseEntity.ok(savedEvent);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Event> updateEvent(@PathVariable String id, @RequestBody Event updatedEvent) {
        return eventRepository.findById(id)
            .map(existingEvent -> {
                existingEvent.setTitle(updatedEvent.getTitle());
                existingEvent.setDescription(updatedEvent.getDescription());
                existingEvent.setPrice(updatedEvent.getPrice());
                existingEvent.setDate(updatedEvent.getDate());
                existingEvent.setAcceptsSponsorship(updatedEvent.isAcceptsSponsorship());
                existingEvent.setSpeakers(updatedEvent.getSpeakers());
                return ResponseEntity.ok(eventRepository.save(existingEvent));
            })
            .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteEvent(@PathVariable String id) {
        if (eventRepository.existsById(id)) {
            eventRepository.deleteById(id);
            return ResponseEntity.ok("Event deleted successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Event not found.");
        }
    }

    @GetMapping("/by-organizer/{organizerId}")
    public List<Event> getEventsByOrganizer(@PathVariable String organizerId) {
        return eventRepository.findByOrganizerId(organizerId);
}

   @GetMapping("/dashboard/{organizerId}")
    public ResponseEntity<?> getOrganizerEventStats(@PathVariable String organizerId) {
    List<Event> events = eventRepository.findByOrganizerId(organizerId);
    List<EventStatsDTO> statsList = new ArrayList<>();

    for (Event event : events) {
        double sponsorships = event.getSponsorships().stream()
                .mapToDouble(s -> s.getAmount())
                .sum();

        List<PaymentOrder> orders = paymentRepository.findByEventId(event.getId());
        double ticketRevenue = orders.stream()
                .mapToDouble(order -> order.getDiscountedAmount() > 0 ? order.getDiscountedAmount() : order.getAmount())
                .sum();

        int registeredUsers = orders.size();

        double rentCost = event.getRentCost();
        double foodCost = event.getFoodCost();

        double netProfit = sponsorships + ticketRevenue - rentCost - foodCost;
        
        statsList.add(new EventStatsDTO(
            event.getTitle(),
            event.getId(),
            sponsorships,
            ticketRevenue,
            registeredUsers,
            netProfit,
            rentCost,
            foodCost
        ));
        
    }

    return ResponseEntity.ok(statsList);
}



}
    


