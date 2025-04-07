package com.example.soen343.repository;

import com.example.soen343.model.Event;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface EventRepository extends MongoRepository<Event, String> {
    List<Event> findByAcceptsSponsorshipTrue();
    List<Event> findBySponsorships_OrganizationId(String organizationId);


}
