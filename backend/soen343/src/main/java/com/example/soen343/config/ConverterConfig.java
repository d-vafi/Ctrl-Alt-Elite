package com.example.soen343.config;

import java.util.Arrays;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.convert.converter.Converter;
import org.springframework.data.mongodb.core.convert.MongoCustomConversions;
import org.springframework.data.mongodb.core.convert.MongoCustomConversions.MongoConverterConfigurationAdapter;
import org.springframework.lang.Nullable;
import com.example.soen343.model.User;
import com.example.soen343.converter.ObjectIdToUser;
import com.example.soen343.repository.UserRepository;
import org.springframework.data.mongodb.config.AbstractMongoClientConfiguration;

@Configuration
public class ConverterConfig extends AbstractMongoClientConfiguration {

    @Override
    protected void configureConverters(MongoConverterConfigurationAdapter adapter) {
        // adapter.registerConverter(new ObjectIdToUser());
    }

    @Override
    protected String getDatabaseName() {
        return "db";
    }

}