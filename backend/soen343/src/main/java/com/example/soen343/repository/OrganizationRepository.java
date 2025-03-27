package com.example.soen343.repository;


import com.example.soen343.model.Organization;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface OrganizationRepository extends MongoRepository<Organization, String> {}

