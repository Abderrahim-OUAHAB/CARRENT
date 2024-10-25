package com.carRent.carRent.dto;

import lombok.Data;

@Data 
public class AuthnetificationRequest {
    private String email;
    private String password;
}