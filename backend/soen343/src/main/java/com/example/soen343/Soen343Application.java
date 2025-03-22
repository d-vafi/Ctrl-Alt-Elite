package com.example.soen343;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.mongo.MongoAutoConfiguration;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

import com.example.soen343.repository.UserRepository;

@SpringBootApplication
@EnableMongoRepositories
// @EnableAutoConfiguration(exclude = { MongoAutoConfiguration.class })
public class Soen343Application {

	@Autowired
	UserRepository userRepo;

	public static void main(String[] args) {
		SpringApplication.run(Soen343Application.class, args);
	}

}
