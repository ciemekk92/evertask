package com.predu.evertask.repository;

import com.predu.evertask.domain.model.OrganisationInvitation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface OrganisationInvitationRepository extends JpaRepository<OrganisationInvitation, UUID> {

    Optional<OrganisationInvitation> findByUserIdAndOrganisationId(UUID userId, UUID organisationId);

    List<OrganisationInvitation> findAllByUserId(UUID id);

    List<OrganisationInvitation> findAllByOrganisationId(UUID id);
}
