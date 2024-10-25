package com.carRent.carRent.dto;

import com.carRent.carRent.enums.UserRole;

import lombok.Data;
@Data
public class UserDto {
    private Long id;
    private String name;
    private String email;
    private String tel;
    private UserRole role;
}