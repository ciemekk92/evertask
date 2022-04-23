package com.predu.evertask.adapter;

import com.predu.evertask.domain.model.Organisation;
import com.predu.evertask.exception.NotFoundException;
import com.predu.evertask.repository.OrganisationRepository;
import lombok.NonNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface OrganisationRepositoryJpa extends OrganisationRepository, JpaRepository<Organisation, UUID> {

    @NonNull
    default Organisation getById(@NonNull UUID id) {
        return findById(id)
                .orElseThrow(() -> new NotFoundException(Organisation.class, id));
    }
}

