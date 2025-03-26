package com.example.soen343.model;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public abstract class AbstractUser {
    protected String id;
    protected String username;
    protected String password;
    protected String type;
    protected String email;
    protected String fullName;
}
