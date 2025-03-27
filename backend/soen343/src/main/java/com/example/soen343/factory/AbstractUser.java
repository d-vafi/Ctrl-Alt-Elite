package com.example.soen343.factory;

import com.example.soen343.repository.EventRepository;
import com.example.soen343.repository.OrganizationRepository;
import lombok.*;

import java.util.Map;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public abstract class AbstractUser {
    protected String id;
    protected String username;
    protected String password;
    protected String type;
    protected String email;
    protected String fullName;
    public abstract Map<String, Object> buildProfileData(EventRepository eventRepo, OrganizationRepository orgRepo);


}
