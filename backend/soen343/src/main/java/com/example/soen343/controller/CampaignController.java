package com.example.soen343.controller;

import com.example.soen343.model.Campaign;
import com.example.soen343.repository.CampaignRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/campaigns")
public class CampaignController {

    @Autowired
    private CampaignRepository campaignRepository;

    @PostMapping("/create")
    public Campaign createCampaign(@RequestBody Map<String, String> body) {
        String eventRef = body.get("event");
        String type = body.get("type");
        String title = body.get("title");
        String description = body.get("description");
        String recipientsRaw = body.get("recipients");

        Campaign campaign = new Campaign(
            eventRef,
            type,
            title,
            description,
            Arrays.stream(recipientsRaw.split(","))
                  .map(String::trim)
                  .toList()
        );

        return campaignRepository.save(campaign);
    }
}