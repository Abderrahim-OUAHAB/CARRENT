package com.carRent.carRent.dto;

import lombok.Data;

@Data

public class SignaUpRequest {
    
    private String name;
    private String email;
    private String password;
    private String tel;
    
}