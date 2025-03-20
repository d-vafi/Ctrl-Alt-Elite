package com.example.soen343;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

@ActiveProfiles("test")  // Uses application-test.properties
@SpringBootTest
class Soen343ApplicationTests {
    @Test
    void contextLoads() {
    }
}