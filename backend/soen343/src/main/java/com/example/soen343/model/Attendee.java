package com.example.soen343.model;

import lombok.*;

import java.util.ArrayList;
import java.util.List;

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
}
