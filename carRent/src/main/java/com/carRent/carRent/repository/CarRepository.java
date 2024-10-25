package com.carRent.carRent.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.carRent.carRent.entity.Car;

@Repository
public interface CarRepository extends JpaRepository<Car, Long> {    
}