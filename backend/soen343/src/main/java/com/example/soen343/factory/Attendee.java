package com.example.soen343.factory;

import com.example.soen343.factory.AbstractUser;
import com.example.soen343.model.Event;
import com.example.soen343.model.Registration;
import com.example.soen343.model.User;
import com.example.soen343.repository.EventRepository;
import com.example.soen343.repository.OrganizationRepository;
import lombok.*;

import java.util.*;

@Getter
@Setter
@NoArgsConstructor
public class Attendee extends AbstractUser {
    private String profession;
    private List<Registration> registrations = new ArrayList<>();
    private List<String> speakerInvitationIds = new ArrayList<>();
    protected String affiliation;

    public Attendee(User user) {
        super(user.getId(), user.getUsername(), user.getPassword(), user.getType(),
                user.getEmail(), user.getFullName());
        this.affiliation = user.getAffiliation();
        this.profession = user.getProfession();
        this.registrations = user.getRegistrations();
        this.speakerInvitationIds = user.getSpeakerInvitationIds();
    }

    @Override
    public Map<String, Object> buildProfileData(EventRepository eventRepo, OrganizationRepository orgRepo) {
        Map<String, Object> data = new HashMap<>();

        List<Map<String, Object>> enrichedEvents = this.registrations.stream()
                .map(reg -> {
                    Event event = eventRepo.findById(reg.getEventId()).orElse(null);
                    if (event == null) return null;
                    Map<String, Object> enriched = new HashMap<>();
                    enriched.put("id", event.getId());
                    enriched.put("title", event.getTitle());
                    enriched.put("description", event.getDescription());
                    enriched.put("price", event.getPrice());
                    enriched.put("date", event.getDate());
                    enriched.put("role", reg.getRole());
                    return enriched;
                })
                .filter(Objects::nonNull)
                .toList();

        data.put("registeredEvents", enrichedEvents);
        data.put("speakerInvitations", eventRepo.findAllById(speakerInvitationIds));

        return data;
    }
}
