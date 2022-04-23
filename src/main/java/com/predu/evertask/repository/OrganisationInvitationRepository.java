package com.predu.evertask.repository;

import com.predu.evertask.domain.model.OrganisationInvitation;

import java.util.List;
import java.util.UUID;

public interface OrganisationInvitationRepository extends BaseRepository<OrganisationInvitation, UUID> {

    List<OrganisationInvitation> findByUserId(UUID id);

    List<OrganisationInvitation> findByOrganisationId(UUID id);
}
