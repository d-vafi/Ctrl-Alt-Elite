package com.example.soen343.factory.Interface;

import com.example.soen343.model.User;
import com.example.soen343.model.Event;
import java.util.List;
import java.util.Optional;

public interface EventMatcher {
    Optional<User> findMatch(User user, Event event, List<User> usersAttending);
}
