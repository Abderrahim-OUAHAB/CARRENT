package com.carRent.carRent.entity;

import java.time.LocalDate;

import com.carRent.carRent.dto.CarDto;
import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Builder;
import lombok.Data;

@Entity
@Table(name = "cars")
@Data
public class Car {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String brand;

    private String color;
    
    private String name;

    private String type;

    private String transmission;

    private String discription;

    private Long price;
   
    private LocalDate year;

   
    private boolean disponible=true;

    @Column(columnDefinition = "longblob")
    private byte[] image;

  

    // Relation Many-to-One : Chaque voiture est associée à une agence
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "agency_id", nullable = false)
    @JsonBackReference
    private Agency agency;

    public CarDto getCarDto() {
        CarDto carDto = new CarDto();
        carDto.setId(id);
        carDto.setBrand(brand);
        carDto.setColor(color);
        carDto.setName(name);
        carDto.setType(type);
        carDto.setTransmission(transmission);
        carDto.setDiscription(discription);
        carDto.setPrice(price);
        carDto.setYear(year);
        carDto.setReturnedImage(image);
        carDto.setDisponible(disponible);
        carDto.setAgencyId(agency.getId());
        carDto.setAgencyName(agency.getName());
        return carDto;
    }

 public void setDisponible(boolean disponible) {
     this.disponible = disponible;
 }

 public boolean getDisponible() {
     return disponible;
 }  
   
}