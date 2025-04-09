package com.example.soen343.service;

import com.example.soen343.model.Conversation;
import com.example.soen343.model.Message;
import com.example.soen343.model.Poll;
import com.example.soen343.model.User;
import com.example.soen343.model.Poll.VoteOption;
import com.example.soen343.observer.MessageEmailObserver;
import com.example.soen343.observer.MessageObservable;
import com.example.soen343.repository.ConversationRepository;
import com.example.soen343.repository.MessageRepository;
import com.example.soen343.repository.PollRepository;
import com.example.soen343.repository.UserRepository;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@Service
public class PollService {

    @Autowired
    private PollRepository pollRepository;

    public List<Poll> findAllByConversationId(String conversationId) {
        return pollRepository.findAllByConversationIdOrderByTimestampAsc(new ObjectId(conversationId));
    }

    public Poll createPoll(String conversationId, String senderId, String title, boolean isMultiselect,
            String startTime, String endTime, boolean isClosed, HashMap<String, VoteOption> votes) {
        Poll poll = new Poll();
        poll.setConversationId(new ObjectId(conversationId));
        poll.setSenderId(new ObjectId(senderId));
        poll.setTitle(title);
        poll.setTimestamp(Long.toString(System.currentTimeMillis() / 1000));
        poll.setMultiselect(isMultiselect);
        poll.setVotes(votes);
        if (startTime != null) {
            poll.setStartTime(startTime);
        } else {
            poll.setStartTime(Long.toString((System.currentTimeMillis() / 60000) * 60));
        }
        poll.setEndTime(endTime);
        poll.setClosed(isClosed);
        poll = pollRepository.save(poll);
        return poll;
    }

    public Optional<Poll> findById(String pollId) {
        return pollRepository.findById(pollId);
    }

    public Poll save(Poll poll) {
        return pollRepository.save(poll);
    }
}