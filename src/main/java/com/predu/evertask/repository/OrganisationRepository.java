package com.predu.evertask.repository;

import com.predu.evertask.domain.model.Organisation;

import java.util.UUID;

public interface OrganisationRepository extends BaseRepository<Organisation, UUID> {

    Organisation getById(UUID id);
}
