package com.example.soen343.factory.Implementation;

import com.example.soen343.factory.Interface.EventMatcher;

public class EventMatchingFactory {
    public static EventMatcher getMatcher(String eventType) {
        return new DefaultEventMatcher();
    }
}
