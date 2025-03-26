package com.example.soen343.converter;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.converter.Converter;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Component;

import com.example.soen343.model.User;
import com.example.soen343.repository.UserRepository;

@Component
public class ObjectIdToUser implements Converter<ObjectId, User> {

    @Autowired
    private UserRepository userRepository;

    @Override
    @Nullable
    public User convert(ObjectId arg0) {
        return userRepository.findById(arg0.toString()).orElse(null);
    }
}