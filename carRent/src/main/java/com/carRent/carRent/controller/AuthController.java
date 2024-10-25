package com.carRent.carRent.controller;

import org.apache.el.stream.Optional;
import org.springframework.boot.autoconfigure.security.SecurityProperties;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.userdetails.UserDetails;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.RestController;

import com.carRent.carRent.services.auth.AuthService;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.carRent.carRent.dto.AuthentificationResponse;
import com.carRent.carRent.dto.AuthnetificationRequest;
import com.carRent.carRent.dto.SignaUpRequest;
import com.carRent.carRent.dto.UserDto;
import com.carRent.carRent.entity.User;
import com.carRent.carRent.repository.UserRepository;
import com.carRent.carRent.services.jwt.UserService;
import com.carRent.carRent.utils.JWTUtil;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    private final AuthenticationManager authenificationManager;

    private final UserService userService;

    private final JWTUtil jwtUtil;

    private final UserRepository userRepository;



    @PostMapping("/signup")
    public ResponseEntity<?> signupCustomer(@RequestBody SignaUpRequest request) {
        if(authService.hasCustomerWithEmail(request.getEmail())) 
            return new ResponseEntity<>("Customer with this email already exists", HttpStatus.NOT_ACCEPTABLE);
        UserDto createdCustomerDto = authService.createCustomer(request);
        if (createdCustomerDto == null) {
            return new ResponseEntity<>("Something went wrong", HttpStatus.BAD_REQUEST); 
        }
        return new ResponseEntity<>(createdCustomerDto, HttpStatus.CREATED);

    }
@GetMapping("/user/{id}")
public User getUserByDto(@PathVariable("id") Long id) {
    return authService.getUserById(id);
}
    @PostMapping("/login")
    public AuthentificationResponse loginCustomer(@RequestBody AuthnetificationRequest request) throws Exception {
       try {
     authenificationManager.authenticate(
             new org.springframework.security.authentication.UsernamePasswordAuthenticationToken(
                     request.getEmail(),
                     request.getPassword()
             )
     );
       } catch (Exception e) {
           throw new Exception("Incorrect email or password", e);
       }
       final UserDetails userDetails = userService.userDetailsService().loadUserByUsername(request.getEmail());
       java.util.Optional<User> user = userRepository.findFirstByEmail(request.getEmail());
       final String jwt = jwtUtil.generateToken(userDetails);
       AuthentificationResponse authentificationResponse = new AuthentificationResponse();
       authentificationResponse.setJwt(jwt);
       authentificationResponse.setUserId(user.get().getId());
       authentificationResponse.setRole(user.get().getRole());
       authentificationResponse.setUsername(user.get().getName());
       return authentificationResponse;
    
    }

}