package com.carRent.carRent.dto;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;

@Data
public class AgencyDto {
    private Long id;

    private String name;

    private String address;

    private String phoneNumber;

    private String email;

    private String city;

    private String country;

    private MultipartFile image; // For file uploads

    private byte[] returnedImage; // For storing the image in byte format, if needed
}
