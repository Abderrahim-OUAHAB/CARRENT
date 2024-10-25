package com.carRent.carRent.services.agency;

import java.io.IOException;
import java.util.List;
import com.carRent.carRent.dto.AgencyDto; // Import the AgencyDto class
import com.carRent.carRent.entity.Agency;

public interface AgencyService {

     List<Agency> getAllAgencies();
     Agency getAgencyById(Long id);
     Agency createAgency(AgencyDto agencyDto) throws IOException; // Accept AgencyDto for creation
     Agency updateAgency(Long id, AgencyDto agencyDto) throws IOException; // Accept AgencyDto for update
     void deleteAgency(Long id);
}
