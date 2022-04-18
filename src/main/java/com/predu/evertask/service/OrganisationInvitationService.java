package com.predu.evertask.service;

import com.predu.evertask.domain.dto.organisation.OrganisationInvitationDto;
import com.predu.evertask.domain.mapper.OrganisationInvitationMapper;
import com.predu.evertask.domain.model.OrganisationInvitation;
import com.predu.evertask.domain.model.User;
import com.predu.evertask.event.OnOrganisationInviteCompleteEvent;
import com.predu.evertask.exception.NotFoundException;
import com.predu.evertask.repository.OrganisationInvitationRepository;
import com.predu.evertask.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Locale;
import java.util.UUID;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class OrganisationInvitationService {

    private final OrganisationInvitationRepository invitationRepository;
    private final UserRepository userRepository;
    private final OrganisationService organisationService;
    private final OrganisationInvitationMapper invitationMapper;
    private final ApplicationEventPublisher eventPublisher;

    public List<OrganisationInvitationDto> findAllByUser(UUID userId) {
        return invitationRepository.findByUserId(userId)
                .stream()
                .map(invitationMapper::organisationInvitationToOrganisationInvitationDto)
                .collect(Collectors.toList());
    }

    public List<OrganisationInvitationDto> findAllByOrganisation(UUID organisationId) {
        return invitationRepository.findByOrganisationId(organisationId)
                .stream()
                .map(invitationMapper::organisationInvitationToOrganisationInvitationDto)
                .collect(Collectors.toList());
    }

    public OrganisationInvitation create(UUID userId, UUID organisationId, Locale locale) {
        OrganisationInvitation invitation = new OrganisationInvitation();
        User user = userRepository.findById(userId).orElseThrow(() -> new NotFoundException("User not found"));

        invitation.setOrganisation(organisationService
                .findById(organisationId)
                .orElseThrow(() -> new NotFoundException("Organisation not found")));
        invitation.setUser(user);

        invitation = invitationRepository.save(invitation);
        eventPublisher.publishEvent(new OnOrganisationInviteCompleteEvent(user, locale));

        return invitation;
    }
}
