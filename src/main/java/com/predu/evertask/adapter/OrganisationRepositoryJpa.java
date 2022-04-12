package com.predu.evertask.adapter;

import com.predu.evertask.domain.model.Organisation;
import com.predu.evertask.exception.NotFoundException;
import com.predu.evertask.repository.OrganisationRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface OrganisationRepositoryJpa extends OrganisationRepository, JpaRepository<Organisation, UUID> {

    default Organisation getById(UUID id) {
        Optional<Organisation> optionalOrganisation = findById(id);

        if (optionalOrganisation.isEmpty()) {
            throw new NotFoundException("Organisation not found");
        }

        return optionalOrganisation.get();
    }
}

