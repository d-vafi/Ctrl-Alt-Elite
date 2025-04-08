package com.example.soen343.service;

import com.example.soen343.factory.AbstractUser;
import com.example.soen343.factory.Attendee;
import com.example.soen343.factory.Stakeholder;
import com.example.soen343.factory.UserFactory;
import com.example.soen343.model.*;
import com.example.soen343.repository.OrganizationRepository;
import com.example.soen343.repository.TinderMatchRepository;
import com.example.soen343.repository.UserRepository;
import com.example.soen343.repository.EventRepository;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private OrganizationRepository organizationRepository;

    @Autowired
    private ConversationService conversationService;

    @Autowired
    private TinderMatchRepository tinderMatchRepository;

    public Optional<User> findByUsernameAndPassword(String username, String password) {
        return userRepository.findByUsernameAndPassword(username, password);
    }

    public User registerUser(User user) {
        return userRepository.save(user);
    }

    public Map<String, Object> getUserProfile(String userId) {
        return userRepository.findById(userId).map(user -> {
            AbstractUser castedUser = UserFactory.createUser(user);
            Map<String, Object> result = new HashMap<>();
            result.put("user", castedUser);
            result.putAll(castedUser.buildProfileData(eventRepository, organizationRepository));
            return result;
        }).orElse(Collections.emptyMap());
    }

    public User updateUser(String userId, User updated) {
        return userRepository.findById(userId).map(user -> {
            user.setFullName(updated.getFullName());
            user.setEmail(updated.getEmail());
            user.setAffiliation(updated.getAffiliation());
            user.setProfession(updated.getProfession());
            // user.setOrganizationId(updated.getOrganizationId());
            return userRepository.save(user);
        }).orElse(null);
    }

    public User registerToEvent(String userId, String eventId) {
        return userRepository.findById(userId).map(user -> {
            boolean alreadyRegistered = user.getRegistrations().stream()
                    .anyMatch(r -> r.getEventId().equals(eventId));
            if (!alreadyRegistered) {
                user.getRegistrations().add(new Registration(eventId, "Learner"));
                return userRepository.save(user);
            }
            return user;
        }).orElse(null);
    }

    public User cancelRegistration(String userId, String eventId) {
        return userRepository.findById(userId).map(user -> {
            user.getRegistrations().removeIf(r -> r.getEventId().equals(eventId));
            return userRepository.save(user);
        }).orElse(null);
    }

    public User acceptInvitation(String userId, String eventId) {
        return userRepository.findById(userId).map(user -> {
            if (user.getSpeakerInvitationIds().contains(eventId)) {
                user.getSpeakerInvitationIds().remove(eventId);

                boolean alreadyRegistered = user.getRegistrations().stream()
                        .anyMatch(r -> r.getEventId().equals(eventId));

                if (!alreadyRegistered) {
                    user.getRegistrations().add(new Registration(eventId, "Speaker"));
                }
                return userRepository.save(user);
            }
            return user;
        }).orElse(null);
    }

    public List<User> getOtherNonConnectedUsersInSameEvents(String userId) {
        List<User> otherUsers = new ArrayList<>();
        List<Conversation> conversations = conversationService.findByUserId(userId);
        System.out.println("Conversations size: " + conversations.size());
        HashSet<String> alreadyConnectedUserIds = new HashSet<>();
        for (Conversation conversation : conversations) {
            System.out.println("conversation = " + conversation);
            List<String> userIds = conversation.getUserIds();
            if (userIds.size() != 2) {
                continue;
            }
            for (String otherUserId : userIds) {
                System.out.println("otherUserId = " + otherUserId);
                if (!otherUserId.equals(userId)) {
                    alreadyConnectedUserIds.add(otherUserId);
                }
            }
        }
        List<TinderMatch> otherTinderUsers = tinderMatchRepository.findBySenderUserId(userId);
        for (TinderMatch otherTinderUser : otherTinderUsers) {
            String otherUserId = otherTinderUser.getSenderUserId();
            if (!otherUserId.equals(userId)) {
                alreadyConnectedUserIds.add(otherUserId);
            }
            otherUserId = otherTinderUser.getReceiverUserId();
            if (!otherUserId.equals(userId)) {
                alreadyConnectedUserIds.add(otherUserId);
            }
        }
        userRepository.findById(userId).ifPresent(user -> {
            List<Registration> registrations = user.getRegistrations();
            for (Registration registration : registrations) {
                String eventId = registration.getEventId();
                if (eventId != null) {
                    List<User> eventUsers = userRepository.findByRegistrationsEventId(eventId);
                    for (User eventUser : eventUsers) {
                        if (!eventUser.getId().equals(userId) &&
                                !alreadyConnectedUserIds.contains(eventUser.getId()) &&
                                !otherUsers.contains(eventUser)) {
                            otherUsers.add(eventUser);
                        }
                    }
                }
            }
        });
        return otherUsers;
    }

}