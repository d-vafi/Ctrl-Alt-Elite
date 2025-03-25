package com.example.soen343.controller;

import com.example.soen343.model.Campaign;
import com.example.soen343.repository.CampaignRepository;
import com.example.soen343.service.EmailService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/campaigns")
public class CampaignController {

    @Autowired
    private CampaignRepository campaignRepository;

    @Autowired
    private EmailService emailService;

    @GetMapping
    public List<Campaign> getAllCampaigns() {
        return campaignRepository.findAll();
    }

    @PutMapping("/{id}")
    public Campaign updateCampaign(@PathVariable String id, @RequestBody Campaign updatedCampaign) {
        return campaignRepository.findById(id)
                .map(campaign -> {
                    campaign.setTitle(updatedCampaign.getTitle());
                    campaign.setDescription(updatedCampaign.getDescription());
                    campaign.setEventRef(updatedCampaign.getEventRef());
                    campaign.setType(updatedCampaign.getType());
                    campaign.setRecipients(updatedCampaign.getRecipients());
                    return campaignRepository.save(campaign);
                })
                .orElseThrow(() -> new RuntimeException("Campaign not found with id: " + id));
    }

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

    @PostMapping("/{id}/send")
    public ResponseEntity<String> sendCampaignEmail(@PathVariable String id) {
        Campaign campaign = campaignRepository.findById(id).orElse(null);
        if (campaign == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Campaign not found");
        }

        emailService.sendCampaignEmail(
            campaign.getTitle(),
            campaign.getDescription(),
            campaign.getRecipients()
        );

        return ResponseEntity.ok("Emails sent successfully!");
    }

    @PutMapping("/{id}/subscribe")
    public Campaign subscribe(@PathVariable String id, @RequestParam String email) {
        return campaignRepository.findById(id).map(campaign -> {
            if (!campaign.getRecipients().contains(email)) {
                campaign.getRecipients().add(email);
                return campaignRepository.save(campaign);
            }
            return campaign;
        }).orElseThrow(() -> new RuntimeException("Campaign not found"));
    }
    
    @PutMapping("/{id}/unsubscribe")
    public Campaign unsubscribe(@PathVariable String id, @RequestParam String email) {
        return campaignRepository.findById(id).map(campaign -> {
            campaign.setRecipients(
                campaign.getRecipients().stream()
                    .filter(e -> !e.equalsIgnoreCase(email))
                    .toList()
            );
            return campaignRepository.save(campaign);
        }).orElseThrow(() -> new RuntimeException("Campaign not found"));
    }
}