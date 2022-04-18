package com.predu.evertask.adapter;

import com.predu.evertask.domain.model.OrganisationInvitation;
import com.predu.evertask.repository.OrganisationInvitationRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface OrganisationInvitationRepositoryJpa extends
        OrganisationInvitationRepository, JpaRepository<OrganisationInvitation, UUID> {
}
