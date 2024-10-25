package com.carRent.carRent.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.carRent.carRent.dto.AgencyDto;
import com.carRent.carRent.entity.Agency;
import com.carRent.carRent.services.agency.AgencyService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/agencies")
@RequiredArgsConstructor
public class AgencyController {
    
    private final AgencyService agencyService;

    @PostMapping
    public ResponseEntity<?> createAgency(
            @RequestParam("name") String name,
            @RequestParam("address") String address,
            @RequestParam("city") String city,
            @RequestParam("country") String country,
            @RequestParam("email") String email,
            @RequestParam("phoneNumber") String phoneNumber,
            @RequestParam(value = "img", required = false) MultipartFile image) throws IOException {
        
        AgencyDto agencyDto = new AgencyDto();
        agencyDto.setName(name);
        agencyDto.setAddress(address);
        agencyDto.setCity(city);
        agencyDto.setCountry(country);
        agencyDto.setEmail(email);
        agencyDto.setPhoneNumber(phoneNumber);
        
        // Set the image if provided
        if (image != null && !image.isEmpty()) {
            agencyDto.setImage(image);
        }

        Agency createdAgency = agencyService.createAgency(agencyDto);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new ResponseMessage("Agency created successfully", createdAgency));
    }

    @GetMapping
    public ResponseEntity<List<Agency>> getAllAgencies() {
        return ResponseEntity.ok(agencyService.getAllAgencies());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Agency> getAgencyById(@PathVariable Long id) {
        return ResponseEntity.ok(agencyService.getAgencyById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateAgency(
            @PathVariable Long id,
            @RequestParam(value = "name", required = false) String name,
            @RequestParam(value = "address", required = false) String address,
            @RequestParam(value = "city", required = false) String city,
            @RequestParam(value = "country", required = false) String country,
            @RequestParam(value = "email", required = false) String email,
            @RequestParam(value = "phoneNumber", required = false) String phoneNumber,
            @RequestParam(value = "img", required = false) MultipartFile image) throws IOException {
        
        AgencyDto agencyDto = new AgencyDto();
        agencyDto.setName(name);
        agencyDto.setAddress(address);
        agencyDto.setCity(city);
        agencyDto.setCountry(country);
        agencyDto.setEmail(email);
        agencyDto.setPhoneNumber(phoneNumber);

        // Set the image if provided
        if (image != null && !image.isEmpty()) {
            agencyDto.setImage(image);
        }

        Agency success = agencyService.updateAgency(id, agencyDto);
        if (success != null) {
            return ResponseEntity.ok(new ResponseMessage("Agency updated successfully"));
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ResponseMessage("Failed to update agency"));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteAgency(@PathVariable Long id) {
        agencyService.deleteAgency(id);
        return ResponseEntity.ok(new ResponseMessage("Agency deleted successfully"));
    }

    // Response message class
    public static class ResponseMessage {
        private String message;
        private Object data;

        public ResponseMessage(String message) {
            this.message = message;
        }

        public ResponseMessage(String message, Object data) {
            this.message = message;
            this.data = data;
        }

        public String getMessage() {
            return message;
        }

        public Object getData() {
            return data;
        }
    }
}
