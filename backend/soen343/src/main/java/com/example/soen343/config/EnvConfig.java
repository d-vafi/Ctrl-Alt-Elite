package com.example.soen343.config;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class EnvConfig {

    private static final Dotenv dotenv = Dotenv.load();

    @Bean
    public String mongoUri() {
        return dotenv.get("MONGO_URI");
    }

    @Bean
    public String mongoDbName() {
        return dotenv.get("MONGO_DB_NAME");
    }
}