package com.carRent.carRent.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.carRent.carRent.entity.User;
import com.carRent.carRent.enums.UserRole;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findFirstByEmail(String email);

    Optional<User>  findByRole(UserRole admin);
}