package com.carRent.carRent.services.customer;

import java.util.List;

import com.carRent.carRent.dto.BookCarDto;
import com.carRent.carRent.dto.CarDto;
import com.carRent.carRent.dto.CarDtoListDto;
import com.carRent.carRent.dto.SearchCarDto;
import com.carRent.carRent.entity.User;

public interface CustomerService {
   List<CarDto> getAllCars();

   boolean bookCar(BookCarDto bookCarDto);

   CarDto getCarById(Long id);

   List<BookCarDto> getBookingsById(Long userId);

   CarDtoListDto searchCar(SearchCarDto searchCarDto);

   public boolean cancelBooking(Long bookingId,String status) ;

   User updateUser(Long id, User updatedUser);

}