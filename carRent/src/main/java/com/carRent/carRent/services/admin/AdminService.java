package com.carRent.carRent.services.admin;

import java.util.List;

import com.carRent.carRent.dto.BookCarDto;
import com.carRent.carRent.dto.CarDto;
import com.carRent.carRent.dto.CarDtoListDto;
import com.carRent.carRent.dto.SearchCarDto;
import com.carRent.carRent.entity.User;

import io.jsonwebtoken.io.IOException;

public interface AdminService {
   boolean postCar(CarDto car,Long agencyId) throws IOException;

   List<CarDto> getAllCars();

   void deleteCar(Long id);

   CarDto getCarById(Long id);

   boolean updateCar(CarDto car, Long id);

   List<BookCarDto> getBookings();

   boolean changeBookingStatus(Long id, String status);

   CarDtoListDto searchCar(SearchCarDto searchCarDto);


}