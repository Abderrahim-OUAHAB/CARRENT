package com.carRent.carRent.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.carRent.carRent.entity.Agency;
@Repository
public interface AgencyRepository extends JpaRepository<Agency, Long> {
}
