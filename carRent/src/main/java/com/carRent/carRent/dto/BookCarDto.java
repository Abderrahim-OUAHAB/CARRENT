package com.carRent.carRent.dto;

import java.time.LocalDate;

import com.carRent.carRent.enums.BookCarStatus;

import lombok.Data;

@Data
public class BookCarDto {
     private Long id;
    
    private LocalDate startDate;
    
    private LocalDate endDate;
    
    private Long days;
    
    private Long price;

    private BookCarStatus status;

    private Long userId;

    private Long carId;

    private String userName;

    private String email;
}