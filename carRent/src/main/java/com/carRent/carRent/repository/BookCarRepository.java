package com.carRent.carRent.repository;

import java.util.Collection;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.carRent.carRent.dto.CarDto;
import com.carRent.carRent.entity.BookCar;
@Repository
public interface BookCarRepository extends JpaRepository<BookCar, Long> {

    List<BookCar> findAllByUserId(Long userId);
    
}