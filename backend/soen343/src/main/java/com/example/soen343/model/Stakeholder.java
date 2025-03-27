package com.example.soen343.model;

import lombok.*;

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
}
