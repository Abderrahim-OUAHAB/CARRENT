package com.carRent.carRent.services.agency;

import java.util.Collections;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.carRent.carRent.dto.AgencyDto;
import com.carRent.carRent.entity.Agency;
import com.carRent.carRent.repository.AgencyRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AgencyServiceImpl implements AgencyService {

    private final AgencyRepository agencyRepository;

    // Retrieve all agencies
    @Override
    public List<Agency> getAllAgencies() {
        List<Agency> agencies = agencyRepository.findAll();
        return agencies != null ? agencies : Collections.emptyList();
    }

    // Retrieve agency by ID
    @Override
    public Agency getAgencyById(Long id) {
        return agencyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Agency not found with ID: " + id));
    }

    // Create a new agency
    @Override
    @Transactional
    public Agency createAgency(AgencyDto agencyDto) {
        Agency agency = new Agency();
        mapDtoToEntity(agencyDto, agency);  // Map DTO fields to the Agency entity
        return agencyRepository.save(agency);
    }

    // Update an existing agency
    @Override
    @Transactional
    public Agency updateAgency(Long id, AgencyDto agencyDto) {
        Agency existingAgency = getAgencyById(id);  // Check if the agency exists
        mapDtoToEntity(agencyDto, existingAgency);  // Update fields from the DTO
        return agencyRepository.save(existingAgency);
    }

    // Delete an agency
    @Override
    @Transactional
    public void deleteAgency(Long id) {
        Agency agency = getAgencyById(id);  // Check if the agency exists
        agencyRepository.delete(agency);    // Delete the agency
    }

    // Helper method to map DTO fields to entity
    private void mapDtoToEntity(AgencyDto dto, Agency agency) {
        agency.setName(dto.getName());
        agency.setAddress(dto.getAddress());
        agency.setCity(dto.getCity());
        agency.setCountry(dto.getCountry());
        agency.setEmail(dto.getEmail());
        agency.setPhoneNumber(dto.getPhoneNumber());

        if (dto.getImage() != null && !dto.getImage().isEmpty()) {
            try {
                agency.setImage(dto.getImage().getBytes());  // Process the image
            } catch (java.io.IOException e) {
                throw new RuntimeException("Error processing image", e);
            }
        }
    }
}
