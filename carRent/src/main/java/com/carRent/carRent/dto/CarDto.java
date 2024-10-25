package com.carRent.carRent.dto;

import java.time.LocalDate;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;

@Data
public class CarDto {
     private Long id;

    private String brand;

    private String color;
    
    private String name;

    private String type;

    private String transmission;

    private String discription;

    private Long price;
   
    private LocalDate year;
   
    private MultipartFile image;

    private byte[] returnedImage;

    private boolean disponible;

    private Long agencyId;

    private String agencyName;

  
}