package com.predu.evertask.repository;

import com.predu.evertask.domain.model.Organisation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface OrganisationRepository extends JpaRepository<Organisation, UUID> {

    Organisation getById(UUID id);
}
