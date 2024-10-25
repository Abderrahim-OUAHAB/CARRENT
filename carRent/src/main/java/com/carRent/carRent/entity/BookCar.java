package com.carRent.carRent.entity;

import java.time.LocalDate;

import org.hibernate.annotations.ManyToAny;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.carRent.carRent.dto.BookCarDto;
import com.carRent.carRent.enums.BookCarStatus;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "book_car")
@Data
public class BookCar {
    

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private LocalDate startDate;
    
    private LocalDate endDate;
    
    private Long days;
    
    private Long price;
     @Enumerated(EnumType.STRING)
    private BookCarStatus status;

    @ManyToOne(fetch=jakarta.persistence.FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private User user;

    @ManyToOne(fetch=jakarta.persistence.FetchType.LAZY, optional = false)
    @JoinColumn(name = "car_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private Car car;

    public BookCarDto getBookCarDto() {
        BookCarDto bookCarDto = new BookCarDto();
        bookCarDto.setId(this.id);
        bookCarDto.setStartDate(this.startDate);
        bookCarDto.setEndDate(this.endDate);
        bookCarDto.setDays(this.days);
        bookCarDto.setPrice(this.price);
        bookCarDto.setStatus(this.status);
        bookCarDto.setUserId(this.user.getId());
        bookCarDto.setCarId(this.car.getId());
        bookCarDto.setUserName(this.user.getName());
        bookCarDto.setEmail(this.user.getEmail());
        return bookCarDto;
    }

 
}