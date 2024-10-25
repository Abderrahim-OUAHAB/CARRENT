package com.carRent.carRent.dto;

import com.carRent.carRent.enums.UserRole;

import lombok.Data;
@Data
public class AuthentificationResponse {
   private String jwt;
   private UserRole role;
   private Long userId;
   private String username;
}