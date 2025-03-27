package com.example.soen343.factory.Implementation;

import com.example.soen343.model.User;
import com.example.soen343.factory.Interface.EventMatcher;
import com.example.soen343.model.Event;
import java.util.List;
import java.util.Optional;

public class DefaultEventMatcher implements EventMatcher {
    @Override
    public Optional<User> findMatch(User user, Event event, List<User> usersAttending) {
        return usersAttending.stream()
                .filter(otherUser -> !otherUser.getId().equals(user.getId()))
                .findFirst();
    }
}
