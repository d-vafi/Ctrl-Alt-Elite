package com.example.soen343.factory;

import com.example.soen343.factory.AbstractUser;
import com.example.soen343.model.Organization;
import com.example.soen343.model.Sponsorship;
import com.example.soen343.model.User;
import com.example.soen343.repository.EventRepository;
import com.example.soen343.repository.OrganizationRepository;
import lombok.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Getter
@Setter
@NoArgsConstructor
public class Stakeholder extends AbstractUser {
    private String organizationId;
    public Stakeholder(User user) {
        super(user.getId(), user.getUsername(), user.getPassword(), user.getType(),
                user.getEmail(), user.getFullName());
        this.organizationId = user.getOrganizationId();
    }


    @Override
    public Map<String, Object> buildProfileData(EventRepository eventRepo, OrganizationRepository orgRepo) {
        Map<String, Object> data = new HashMap<>();

        Organization org = orgRepo.findById(organizationId).orElse(null);
        data.put("organization", org);

        List<Map<String, Object>> sponsoredEvents = eventRepo.findAll().stream()
                .filter(e -> e.getSponsorships() != null)
                .filter(e -> e.getSponsorships().stream()
                        .anyMatch(s -> s.getOrganizationId().equals(this.organizationId)))
                .map(e -> {
                    Map<String, Object> eventInfo = new HashMap<>();
                    eventInfo.put("id", e.getId());
                    eventInfo.put("title", e.getTitle());
                    eventInfo.put("description", e.getDescription());
                    eventInfo.put("price", e.getPrice());

                    double amount = e.getSponsorships().stream()
                            .filter(s -> s.getOrganizationId().equals(this.organizationId))
                            .mapToDouble(Sponsorship::getAmount)
                            .sum();

                    eventInfo.put("sponsorshipAmount", amount);
                    return eventInfo;
                })
                .toList();

        data.put("sponsoredEvents", sponsoredEvents);
        return data;
    }
}
