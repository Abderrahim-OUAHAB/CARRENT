package com.carRent.carRent.services.admin;

import java.io.IOException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.stereotype.Service;

import com.carRent.carRent.dto.BookCarDto;
import com.carRent.carRent.dto.CarDto;
import com.carRent.carRent.dto.CarDtoListDto;
import com.carRent.carRent.dto.SearchCarDto;
import com.carRent.carRent.entity.Agency;
import com.carRent.carRent.entity.BookCar;
import com.carRent.carRent.entity.Car;
import com.carRent.carRent.entity.User;
import com.carRent.carRent.enums.BookCarStatus;
import com.carRent.carRent.repository.AgencyRepository;
import com.carRent.carRent.repository.BookCarRepository;
import com.carRent.carRent.repository.CarRepository;
import com.carRent.carRent.repository.UserRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService{
    
    private final CarRepository carRepository;
    private final UserRepository userRepository;
    private final BookCarRepository bookCarRepository;
    private final AgencyRepository agencyRepository;

    @Override
    public boolean postCar(CarDto car, Long agencyId) {
        try{
     Agency agency = agencyRepository.findById(agencyId) .orElseThrow(() -> new RuntimeException("Agency not found"));

     Car newCar = new Car();
     newCar.setBrand(car.getBrand());
     newCar.setColor(car.getColor());
     newCar.setName(car.getName());
     newCar.setType(car.getType());
     newCar.setTransmission(car.getTransmission());
     newCar.setDiscription(car.getDiscription());
     newCar.setPrice(car.getPrice());
     newCar.setYear(car.getYear());
     newCar.setImage(car.getImage().getBytes());
     newCar.setAgency(agency);
     newCar.setDisponible(true);
     carRepository.save(newCar);
     return true;
    }
     catch(IOException e){
         return false;
     }
   
    }

    @Override
    public List<CarDto> getAllCars() {
       return carRepository.findAll().stream().map(Car::getCarDto).collect(Collectors.toList());
    }

  
    @Override
    public void deleteCar(Long id) {
      carRepository.deleteById(id);
    }

    @Override
    public CarDto getCarById(Long id) {
        Optional<Car> car = carRepository.findById(id);
        return car.map(Car::getCarDto).orElse(null);
    }

    @Override
    public boolean updateCar(CarDto car, Long id) {
        Optional<Car> oldCar = carRepository.findById(id);
        if(oldCar.isPresent()){
            Car newCar = oldCar.get();
            newCar.setBrand(car.getBrand());
            newCar.setColor(car.getColor());
            newCar.setName(car.getName());
            newCar.setType(car.getType());
            newCar.setTransmission(car.getTransmission());
            newCar.setDiscription(car.getDiscription());
            newCar.setPrice(car.getPrice());
            newCar.setYear(car.getYear());
            if (car.getImage() != null) {
            try {
                newCar.setImage(car.getImage().getBytes());
            } catch (IOException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }}
            carRepository.save(newCar);
            return true;
        }
        return false;
    }

    @Override
    public List<BookCarDto> getBookings() {
       return bookCarRepository.findAll().stream().map(BookCar::getBookCarDto).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public boolean changeBookingStatus(Long id, String status) {
        Optional<BookCar> booking = bookCarRepository.findById(id);
        Car car = booking.get().getCar();
        if(booking.isPresent()){
            BookCar newBooking = booking.get();
           if(Objects.equals(status, "APPROVED")){
               newBooking.setStatus(BookCarStatus.APPROVED);
               car.setDisponible(false);
             
           }
           else if(Objects.equals(status, "REJECTED")){
               newBooking.setStatus(BookCarStatus.REJECTED);
               car.setDisponible(true);
             
           }
           System.out.println("Disponible avant save: " + car.getDisponible());
           carRepository.save(car);
           bookCarRepository.save(newBooking);
            return true;
        }
        return false;
    }

    @Override
    public CarDtoListDto searchCar(SearchCarDto searchCarDto) {
       Car car = new Car();
       car.setBrand(searchCarDto.getBrand());
       car.setTransmission(searchCarDto.getTransmission());
       car.setType(searchCarDto.getType());
       car.setColor(searchCarDto.getColor());
       car.setDisponible(searchCarDto.isDisponible());
       ExampleMatcher exampleMatcher = ExampleMatcher.matchingAll().
       withMatcher("brand", ExampleMatcher.GenericPropertyMatchers.contains().ignoreCase())
       .withMatcher("color", ExampleMatcher.GenericPropertyMatchers.contains().ignoreCase())
       .withMatcher("type", ExampleMatcher.GenericPropertyMatchers.contains().ignoreCase())
       .withMatcher("transmission", ExampleMatcher.GenericPropertyMatchers.contains().ignoreCase())
       .withMatcher("disponible", ExampleMatcher.GenericPropertyMatchers.exact());

       Example<Car> example = Example.of(car, exampleMatcher);
       List<Car> cars = carRepository.findAll(example);
       CarDtoListDto carListDto = new CarDtoListDto();
       carListDto.setCarDtoList(cars.stream().map(Car::getCarDto).collect(Collectors.toList()));
       return carListDto;

    }


}