package com.example.soen343.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.soen343.model.TinderMatch;

@Repository
public interface TinderMatchRepository extends MongoRepository<TinderMatch, String> {
        List<TinderMatch> findBySenderUserId(String senderUserId);

        List<TinderMatch> findByReceiverUserId(String receiverUserId);

        List<TinderMatch> findBySenderUserIdAndReceiverUserId(String senderUserId, String receiverUserId);

        List<TinderMatch> findBySenderUserIdAndReceiverUserIdAndIsRejection(String senderUserId, String receiverUserId,
                        boolean isRejection);

        List<TinderMatch> findBySenderUserIdAndReceiverUserIdAndIsRejectionFalse(String senderUserId,
                        String receiverUserId);

        List<TinderMatch> findBySenderUserIdAndReceiverUserIdAndIsRejectionTrue(String senderUserId,
                        String receiverUserId);

        @Query("{'$or': [{'senderUserId': ?0}, {'receiverUserId': ?0}]}")
        List<TinderMatch> findByUserId(String userId);

        @Query("{'senderUserId': ?0, 'isRejection': false}")
        List<TinderMatch> findAcceptedMatchesBySenderUserId(String userId);

        @Query("{'senderUserId': ?0, 'isRejection': true}")
        List<TinderMatch> findRejectedMatchesBySenderUserId(String userId);

        @Query("{'receiverUserId': ?0, 'isRejection': false}")
        List<TinderMatch> findAcceptedMatchesByReceiverUserId(String userId);

        @Query("{'receiverUserId': ?0, 'isRejection': true}")
        List<TinderMatch> findRejectedMatchesByReceiverUserId(String userId);
}
