package com.carRent.carRent.services.auth;

import com.carRent.carRent.dto.SignaUpRequest;
import com.carRent.carRent.dto.UserDto;
import com.carRent.carRent.entity.User;

public interface AuthService {
    UserDto createCustomer(SignaUpRequest request);

    boolean hasCustomerWithEmail(String email);
       User getUserById(Long id);
}