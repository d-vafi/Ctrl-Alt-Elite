package com.example.soen343.factory;

import com.example.soen343.model.Organization;
import com.example.soen343.model.User;
import com.example.soen343.repository.EventRepository;
import com.example.soen343.repository.OrganizationRepository;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashMap;
import java.util.Map;

@Getter
@Setter
@NoArgsConstructor
public class Organizer extends AbstractUser {
    private String organizationId;

    public Organizer(User user) {
        super(user.getId(), user.getUsername(), user.getPassword(), user.getType(),
                user.getEmail(), user.getFullName());
        this.organizationId = user.getOrganizationId();
    }

    @Override
    public Map<String, Object> buildProfileData(EventRepository eventRepo, OrganizationRepository orgRepo) {
        Map<String, Object> data = new HashMap<>();

        Organization org = orgRepo.findById(organizationId).orElse(null);
        data.put("organization", org);

        return data;
    }
}
