package com.example.soen343.controller;

import com.example.soen343.model.Message;
import com.example.soen343.model.Poll;
import com.example.soen343.model.User;
import com.example.soen343.model.Poll.VoteOption;
import com.example.soen343.repository.UserRepository;
import com.example.soen343.service.ConversationService;
import com.example.soen343.service.PollService;
import com.example.soen343.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000") // Allows React to call API
@RestController
@RequestMapping("/api/poll")
public class PollController {
    @Autowired
    private PollService pollService;

    @PostMapping("/create")
    public Map<String, Object> createPoll(@RequestBody Map<String, Object> data) {
        Map<String, Object> response = new HashMap<>();
        String conversationId = (String) data.get("conversationId");
        String senderId = (String) data.get("senderId");
        String title = (String) data.get("title");
        HashMap<String, VoteOption> votes = (HashMap<String, VoteOption>) data.get("votes");
        boolean isMultiselect = (boolean) data.get("isMultiselect");
        String startTime = (String) data.get("startTime");
        String endTime = (String) data.get("endTime");
        boolean isClosed = (boolean) data.get("isClosed");
        pollService.createPoll(conversationId, senderId, title, isMultiselect,
                startTime, endTime, isClosed, votes);
        response.put("success", true);
        return response;
    }

    @PostMapping("/close/{pollId}")
    public Map<String, Object> closePoll(@PathVariable String pollId) {
        Map<String, Object> response = new HashMap<>();
        Optional<Poll> poll = pollService.findById(pollId);
        if (poll.isPresent()) {
            Poll p = poll.get();
            p.setClosed(true);
            pollService.save(p);
            response.put("success", true);
        } else {
            response.put("success", false);
        }
        return response;
    }

    @PostMapping("/vote/{pollId}")
    public Map<String, Object> votePoll(@PathVariable String pollId, @RequestBody Map<String, Object> data) {
        Map<String, Object> response = new HashMap<>();
        Optional<Poll> poll = pollService.findById(pollId);

        String userId = (String) data.get("userId");
        List<String> options = (List<String>) data.get("options");
        if (poll.isPresent()) {
            Poll p = poll.get();

            HashMap<String, VoteOption> votes = p.getVotes();
            for (String option : options) {
                if (votes.containsKey(option)) {
                    VoteOption voteOption = votes.get(option);
                    List<String> userVotes = voteOption.getVotes();
                    if (!userVotes.contains(userId)) {
                        userVotes.add(userId);
                    }
                } else {
                    List<String> userVotes = new ArrayList<>();
                    userVotes.add(userId);
                    votes.put(option, new VoteOption(option, userVotes));
                }
            }
            p.setVotes(votes);
            pollService.save(p);
            response.put("success", true);
        } else {
            response.put("success", false);
        }
        return response;
    }

    @GetMapping("/conversation/{conversationId}")
    public Map<String, Object> getPollsByConversationId(@PathVariable String conversationId) {
        Map<String, Object> response = new HashMap<>();
        List<Poll> polls = pollService.findAllByConversationId(conversationId);
        List<Map<String, Object>> pollList = new ArrayList<>();
        for (Poll message : polls) {
            Map<String, Object> pollMap = new HashMap<>();
            pollMap.put("id", message.getId());
            pollMap.put("conversationId", message.getConversationId().toString());
            pollMap.put("senderId", message.getSenderId().toString());
            pollMap.put("isMultiselect", message.isMultiselect());
            pollMap.put("votes", message.getVotes());
            pollMap.put("startTime", message.getStartTime());
            pollMap.put("endTime", message.getEndTime());
            pollMap.put("isClosed", message.isClosed());
            pollMap.put("timestamp", message.getTimestamp());
            pollMap.put("title", message.getTitle());
            pollList.add(pollMap);
        }
        response.put("polls", pollList);
        response.put("success", true);
        return response;
    }
}