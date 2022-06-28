package com.predu.evertask.service;

import com.predu.evertask.domain.dto.organisation.OrganisationInvitationDto;
import com.predu.evertask.domain.mapper.OrganisationInvitationMapper;
import com.predu.evertask.domain.model.Organisation;
import com.predu.evertask.domain.model.OrganisationInvitation;
import com.predu.evertask.domain.model.Role;
import com.predu.evertask.domain.model.User;
import com.predu.evertask.event.OnOrganisationInviteCompleteEvent;
import com.predu.evertask.exception.NotFoundException;
import com.predu.evertask.repository.OrganisationInvitationRepository;
import com.predu.evertask.repository.RoleRepository;
import com.predu.evertask.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Transactional
@RequiredArgsConstructor
@Service
public class OrganisationInvitationService {

    private final OrganisationInvitationRepository invitationRepository;
    private final UserRepository userRepository;
    private final OrganisationService organisationService;
    private final OrganisationInvitationMapper invitationMapper;
    private final RoleRepository roleRepository;
    private final ApplicationEventPublisher eventPublisher;

    public List<OrganisationInvitationDto> findAllByUser(UUID userId) {
        return invitationRepository.findAllByUserId(userId)
                .stream()
                .map(invitationMapper::organisationInvitationToOrganisationInvitationDto)
                .toList();
    }

    public List<OrganisationInvitationDto> findAllByOrganisation(UUID organisationId) {
        return invitationRepository.findAllByOrganisationId(organisationId)
                .stream()
                .map(invitationMapper::organisationInvitationToOrganisationInvitationDto)
                .toList();
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

    public void acceptInvitation(UUID organisationId, UUID userId) {
        OrganisationInvitation invitation = invitationRepository.findByUserIdAndOrganisationId(userId, organisationId)
                .orElseThrow(() -> new NotFoundException("Invitation not found"));

        Organisation organisation = organisationService.findById(invitation.getOrganisation().getId())
                .orElseThrow(() -> new NotFoundException("Organisation not found"));

        User user = userRepository.getById(userId);

        if (user.getAuthorities().stream().noneMatch(role -> role.getAuthority().equals(Role.ROLE_ADMIN))) {
            Role role = roleRepository.findByAuthority(Role.ROLE_USER);
            Set<Role> roleSet = Stream.of(role).collect(Collectors.toSet());
            roleSet.add(role);

            user.setAuthorities(roleSet);
            user.setOrganisation(organisation);
        }

        userRepository.save(user);
        invitationRepository.delete(invitation);
    }

    public void declineInvitation(UUID organisationId, UUID userId) {
        OrganisationInvitation invitation = invitationRepository.findByUserIdAndOrganisationId(userId, organisationId)
                .orElseThrow(() -> new NotFoundException("Invitation not found"));

        invitationRepository.delete(invitation);
    }
}
