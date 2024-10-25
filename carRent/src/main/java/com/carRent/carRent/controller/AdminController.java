package com.carRent.carRent.controller;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.carRent.carRent.dto.BookCarDto;
import com.carRent.carRent.dto.CarDto;
import com.carRent.carRent.dto.SearchCarDto;
import com.carRent.carRent.services.admin.AdminService;

import io.jsonwebtoken.io.IOException;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {
    private final AdminService adminService;

    @PostMapping("/cars")
    public ResponseEntity<?> postCar(
            @RequestParam("brand") String brand,
            @RequestParam("color") String color,
            @RequestParam("name") String name,
            @RequestParam("type") String type,
            @RequestParam("transmission") String transmission,
            @RequestParam("description") String description,
            @RequestParam("price") Long price,
            @RequestParam("year") LocalDate year,
            @RequestParam("img") MultipartFile image,
            @RequestParam("agencyId") Long agencyId 
           ) { 

        CarDto carDto = new CarDto();
        carDto.setBrand(brand);
        carDto.setColor(color);
        carDto.setName(name);
        carDto.setType(type);
        carDto.setTransmission(transmission);
        carDto.setDiscription(description);
        carDto.setPrice(price);
        carDto.setYear(year);
        carDto.setImage(image);
        carDto.setAgencyId(agencyId); // Set agencyId in the DTO


        boolean result = adminService.postCar(carDto, agencyId);
        if (result) {
            return ResponseEntity.ok(new ResponseMessage("Car added successfully"));
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseMessage("Failed to add car"));
        }
    }

    @PutMapping("/cars/{id}")
    public ResponseEntity<?> updateCar(
            @PathVariable Long id,
            @RequestParam(required = false) MultipartFile img,
            @RequestParam String name,
            @RequestParam String brand,
            @RequestParam String type,
            @RequestParam String color,
            @RequestParam String transmission,
            @RequestParam Long price,
            @RequestParam String discription,
            @RequestParam LocalDate year,
            @RequestParam Long agencyId) { 

        CarDto carDto = new CarDto();
        carDto.setName(name);
        carDto.setBrand(brand);
        carDto.setType(type);
        carDto.setColor(color);
        carDto.setTransmission(transmission);
        carDto.setDiscription(discription);
        carDto.setPrice(price);
        carDto.setYear(year);
        carDto.setAgencyId(agencyId); // Set agencyId in the DTO
      

        if (img != null && !img.isEmpty()) {
            try {
                carDto.setImage(img);
            } catch (IOException e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body("Failed to process the image");
            }
        }

        boolean success = adminService.updateCar(carDto, id);
        if (success) {
            return ResponseEntity.ok(new ResponseMessage("Car updated successfully"));
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseMessage("Failed to update car"));
        }
    }
@GetMapping("/cars")
public ResponseEntity<List<CarDto>> getAllCars() {
    return ResponseEntity.ok(adminService.getAllCars());
}

@GetMapping("/cars/{id}")
public ResponseEntity<CarDto> getCarById(@PathVariable("id") Long id) {
    return ResponseEntity.ok(adminService.getCarById(id));
}

@DeleteMapping("/cars/{id}")
public ResponseEntity<?> deleteCar(@PathVariable("id") Long id) {
    adminService.deleteCar(id);
    return ResponseEntity.ok(new ResponseMessage("Car deleted successfully"));
}

@GetMapping("/cars/bookings")
public ResponseEntity<List<BookCarDto>> getBookings() {
    return ResponseEntity.ok(adminService.getBookings());
}

@GetMapping("/cars/bookings/{userId}/{status}")
public ResponseEntity<?> changeBookingStatus(@PathVariable Long userId, @PathVariable String status) {
    boolean success = adminService.changeBookingStatus(userId, status);
    if (success) {
        // Return a JSON response
        return ResponseEntity.ok(new ResponseMessage("Booking status updated successfully"));
    } else {
        // Return a JSON response with error
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseMessage("Failed to update booking status"));
    }
    
}

@PostMapping("/cars/search")
public ResponseEntity<?> searchCar(@RequestBody SearchCarDto searchCarDto) {
    return ResponseEntity.ok(adminService.searchCar(searchCarDto));
}

// Create a simple DTO for response messages
public static class ResponseMessage {
    private String message;

    public ResponseMessage(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}



}