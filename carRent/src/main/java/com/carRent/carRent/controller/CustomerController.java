package com.carRent.carRent.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.carRent.carRent.dto.BookCarDto;
import com.carRent.carRent.dto.CarDto;
import com.carRent.carRent.dto.SearchCarDto;
import com.carRent.carRent.entity.User;
import com.carRent.carRent.services.customer.CustomerService;
import com.carRent.carRent.services.jwt.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/customer")
@RequiredArgsConstructor
public class CustomerController {
    private final CustomerService customerService;
    @GetMapping("/cars")
    public ResponseEntity<List<CarDto>> getAllCars() {
        return ResponseEntity.ok(customerService.getAllCars());
    }
    @PostMapping("/cars/book")
    public ResponseEntity<?> bookCar(@RequestBody BookCarDto bookCarDto) {
        boolean succes=customerService.bookCar(bookCarDto);

        if(succes){
            return ResponseEntity.ok(new AdminController.ResponseMessage("Car booked successfully"));
        }
        return ResponseEntity.badRequest().body(new AdminController.ResponseMessage("Car not booked"));
    }

    @GetMapping("/cars/{id}")
    public ResponseEntity<CarDto> getCarById(@PathVariable("id") Long id) {
        CarDto car = customerService.getCarById(id);
        if(car==null){
            return ResponseEntity.notFound().build();  
        }
        return ResponseEntity.ok(car);
    }

    @GetMapping("/cars/bookings/{userId}")
    public ResponseEntity<List<BookCarDto>> getBookingsById(@PathVariable Long userId) {
        return ResponseEntity.ok(customerService.getBookingsById(userId));
    }


@PostMapping("/cars/search")
public ResponseEntity<?> searchCar(@RequestBody SearchCarDto searchCarDto) {
    return ResponseEntity.ok(customerService.searchCar(searchCarDto));
}
@GetMapping("/cars/cancel/{id}/{status}")
    public ResponseEntity<?> cancelBooking(@PathVariable Long id, @PathVariable String status) {
        boolean result = customerService.cancelBooking(id,status);
        
         Map<String, String> response = new HashMap<>();
    if (result) {
        response.put("message", "Réservation annulée avec succès.");
        return ResponseEntity.ok(response);
    } else {
        response.put("message", "Réservation introuvable.");
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
    }
    }
     @PutMapping("/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody User updatedUser) {
        return customerService.updateUser(id, updatedUser);
    }

    
}