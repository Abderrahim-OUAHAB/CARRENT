package com.carRent.carRent.services.auth;

import org.apache.el.stream.Optional;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.carRent.carRent.dto.SignaUpRequest;
import com.carRent.carRent.dto.UserDto;
import com.carRent.carRent.entity.User;
import com.carRent.carRent.enums.UserRole;
import com.carRent.carRent.repository.UserRepository;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthServiceImp implements AuthService {
   private final UserRepository userRepository;

   @PostConstruct
   public void createAdmin() {
       java.util.Optional<User> adminAccount = userRepository.findByRole(UserRole.ADMIN);
   
       if (adminAccount.isEmpty()) {  // If no admin exists, create one
           User user = new User();
           user.setName("admin");
           user.setEmail("admin@gmail.com");
           user.setTel("+212 63 23 94 897");
           user.setPassword(new BCryptPasswordEncoder().encode("admin123456"));
           user.setRole(UserRole.ADMIN);
           userRepository.save(user);
           System.out.println("Admin account created");
       } else {
           System.out.println("Admin account already exists");
       }
   }
   
@Override
public UserDto createCustomer(SignaUpRequest request) {

    User user = new User();
    user.setName(request.getName());
    user.setEmail(request.getEmail());
    user.setTel(request.getTel());
    user.setPassword(new BCryptPasswordEncoder().encode(request.getPassword()));
    user.setRole(UserRole.CUSTOMER);
    User savedUser = userRepository.save(user);
    UserDto userDto = new UserDto();
    userDto.setId(savedUser.getId());
    return userDto;
}

@Override
public boolean hasCustomerWithEmail(String email) {
   return userRepository.findFirstByEmail(email).isPresent();
}
@Override
public User getUserById(Long id) {
    java.util.Optional<User> user = userRepository.findById(id);
    return user.orElse(null);
  
}
}