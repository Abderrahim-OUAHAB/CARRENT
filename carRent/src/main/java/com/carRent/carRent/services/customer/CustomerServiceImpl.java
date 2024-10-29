package com.carRent.carRent.services.customer;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.carRent.carRent.dto.BookCarDto;
import com.carRent.carRent.dto.CarDto;
import com.carRent.carRent.dto.CarDtoListDto;
import com.carRent.carRent.dto.SearchCarDto;
import com.carRent.carRent.entity.BookCar;
import com.carRent.carRent.entity.Car;
import com.carRent.carRent.entity.User;
import com.carRent.carRent.enums.BookCarStatus;
import com.carRent.carRent.repository.BookCarRepository;
import com.carRent.carRent.repository.CarRepository;
import com.carRent.carRent.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CustomerServiceImpl implements CustomerService{
    
    private final CarRepository carRepository;

    private final UserRepository userRepository;

    private final BookCarRepository bookCarRepository;

    @Override
    public List<CarDto> getAllCars() {
        return carRepository.findAll().stream().map(Car::getCarDto).collect(Collectors.toList());
    }

    @Override
    public boolean bookCar(BookCarDto bookCarDto) {
        if (bookCarDto.getCarId() == null || bookCarDto.getUserId() == null) {
            throw new IllegalArgumentException("Car ID and User ID must not be null");
        }
    
        Optional<Car> car = carRepository.findById(bookCarDto.getCarId());
        Optional<User> user = userRepository.findById(bookCarDto.getUserId());
    
        if (car.isPresent() && user.isPresent()) {
            BookCar newBook = new BookCar();
            Car carExist = car.get();
            newBook.setCar(carExist);
            newBook.setUser(user.get());
            newBook.setStatus(BookCarStatus.PENDING);
            LocalDate startDate = bookCarDto.getStartDate();
            LocalDate endDate = bookCarDto.getEndDate();
            newBook.setStartDate(startDate);
            newBook.setEndDate(endDate);
            long diffInDays = ChronoUnit.DAYS.between(startDate, endDate); // Corrected: changed endDate to startDate
            newBook.setDays(diffInDays);
            newBook.setPrice(diffInDays * carExist.getPrice());
            bookCarRepository.save(newBook);
            return true;
        }
        return false;
    }
    

    @Override
    public CarDto getCarById(Long id) {
        Optional<Car> car = carRepository.findById(id);
        return car.map(Car::getCarDto).orElse(null);
    }

    @Override
    public List<BookCarDto> getBookingsById(Long userId) {
        return bookCarRepository.findAllByUserId(userId).stream()
                .map(BookCar::getBookCarDto) // Assuming getBookCarDto exists
                .collect(Collectors.toList());
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

   @Override
public boolean cancelBooking(Long bookingId,String status) {
    Optional<BookCar> booking = bookCarRepository.findById(bookingId);
        Car car = booking.get().getCar();
        if(booking.isPresent()){
            BookCar newBooking = booking.get();
           if(Objects.equals(status, "CANCELLED")){
               newBooking.setStatus(BookCarStatus.CANCELLED);
            
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
public User updateUser(Long id, User updatedUser) {
    return userRepository.findById(id).map(user -> {
        user.setName(updatedUser.getName());
        user.setEmail(updatedUser.getEmail());
        user.setTel(updatedUser.getTel());

        // Gérer le mot de passe (Assurez-vous de le hasher si nécessaire)
        if (updatedUser.getPassword() != null && !updatedUser.getPassword().isEmpty()) {
            user.setPassword((new BCryptPasswordEncoder().encode(updatedUser.getPassword())));
        }
        return userRepository.save(user);
    }).orElseThrow(() -> new RuntimeException("User not found"));
}

@Override
public List<Car> getAvailableCars() {
    return carRepository.findByDisponibleTrue();
}


    


    
}