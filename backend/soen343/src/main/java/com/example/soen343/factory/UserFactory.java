package com.example.soen343.factory;

import com.example.soen343.model.*;

public class UserFactory {
    public static AbstractUser createUser(User rawUser) {
        if (rawUser == null || rawUser.getType() == null) return null;

        return switch (rawUser.getType().toLowerCase()) {
            case "attendee" -> new Attendee(rawUser);
            case "stakeholder" -> new Stakeholder(rawUser);
            default -> null; // fallback to User if unknown type
        };
    }
}
