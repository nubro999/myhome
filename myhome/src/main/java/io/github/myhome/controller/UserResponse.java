package io.github.myhome.controller;

import lombok.Getter;

@Getter
public class UserResponse {
    private final String username;
    private final String password;

    public UserResponse(String username, String email) {
        this.username = username;
        this.password = email;
    }

}