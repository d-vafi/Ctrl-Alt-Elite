package com.example.soen343.controller;

import com.example.soen343.model.Organization;
import com.example.soen343.repository.OrganizationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/organizations")
@CrossOrigin(origins = "http://localhost:3000")
public class OrganizationController {

    @Autowired
    private OrganizationRepository organizationRepository;

    @GetMapping
    public List<Organization> getAllOrganizations() {
        return organizationRepository.findAll();
    }
}
