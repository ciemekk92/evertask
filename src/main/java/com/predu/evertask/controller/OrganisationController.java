package com.predu.evertask.controller;

import com.predu.evertask.annotation.*;
import com.predu.evertask.annotation.CurrentUserId;
import com.predu.evertask.domain.dto.organisation.*;
import com.predu.evertask.domain.dto.user.UserDto;
import com.predu.evertask.domain.mapper.OrganisationMapper;
import com.predu.evertask.domain.model.Organisation;
import com.predu.evertask.domain.model.User;
import com.predu.evertask.service.OrganisationInvitationService;
import com.predu.evertask.service.OrganisationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@Controller
@RequestMapping("api/organisations")
public class OrganisationController {

    private final OrganisationService organisationService;
    private final OrganisationMapper organisationMapper;
    private final OrganisationInvitationService invitationService;

    @IsAdmin
    @GetMapping
    public ResponseEntity<List<OrganisationDto>> getAllOrganisations() {
        return ResponseEntity.ok(organisationService.findAll());
    }

    @IsOrganisationMember
    @GetMapping("/{id}")
    public ResponseEntity<OrganisationDto> getOrganisation(@PathVariable UUID id) {
        return organisationService.findById(id)
                .map(organisationMapper::organisationToOrganisationDto)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @IsCurrentOrganisationAdminOrAdmin
    @GetMapping("/{id}/invitations")
    public ResponseEntity<List<OrganisationInvitationDto>> getInvitationsForOrganisation(@PathVariable UUID id) {
        return ResponseEntity.ok(invitationService.findAllByOrganisation(id));
    }

    @IsOrganisationMember
    @GetMapping("/{id}/members")
    public ResponseEntity<List<UserDto>> getOrganisationMembers(@PathVariable UUID id) {
        return ResponseEntity.ok(organisationService.getOrganisationMembers(id));
    }

    @IsUnassignedUserOrAdmin
    @PostMapping
    public ResponseEntity<OrganisationCreateDto> createOrganisation(@RequestBody @Valid OrganisationCreateDto toCreate,
                                                                    Authentication authentication)
            throws URISyntaxException {

        User user = (User) authentication.getPrincipal();

        Organisation created = organisationService.create(toCreate, user);

        return ResponseEntity
                .created(new URI("http://localhost:8080/api/organisations/" + created.getId()))
                .body(toCreate);
    }

    @IsCurrentOrganisationAdminOrAdmin
    @PostMapping("/{id}/invite_user")
    public ResponseEntity<Void> inviteUser(@RequestBody @Valid InviteUserRequest request,
                                           @PathVariable UUID id,
                                           HttpServletRequest servletRequest) {

        UUID userId = request.getUserId();
        invitationService.create(userId, id, servletRequest.getLocale());

        return ResponseEntity.status(201).build();
    }

    @IsUnassignedUser
    @PostMapping("/{organisationId}/accept_invitation")
    public ResponseEntity<Void> acceptInvitation(@PathVariable UUID organisationId,
                                                 @CurrentUserId UUID userId) {

        invitationService.acceptInvitation(organisationId, userId);

        return ResponseEntity.ok().build();
    }

    @IsUnassignedUser
    @PostMapping("/{organisationId}/decline_invitation")
    public ResponseEntity<Void> declineInvitation(@PathVariable UUID organisationId,
                                                  @CurrentUserId UUID userId) {

        invitationService.declineInvitation(organisationId, userId);

        return ResponseEntity.ok().build();
    }

    @IsCurrentOrganisationAdminOrAdmin
    @PostMapping("/{organisationId}/revoke_invitation")
    public ResponseEntity<Void> revokeInvitation(@PathVariable("organisationId") UUID id,
                                                 @RequestBody @Valid InviteUserRequest request) {

        invitationService.declineInvitation(id, request.getUserId());

        return ResponseEntity.ok().build();
    }

    @IsCurrentOrganisationAdminOrAdmin
    @PutMapping("/{id}")
    public ResponseEntity<Void> updateOrganisation(@RequestBody @Valid OrganisationDto toUpdate, @PathVariable UUID id) {
        if (!organisationService.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        organisationService.findById(id)
                .ifPresent(org -> organisationService.update(id, toUpdate));

        return ResponseEntity.noContent().build();
    }

    @IsCurrentOrganisationAdminOrAdmin
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrganisation(@PathVariable UUID id) {
        if (!organisationService.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        organisationService.deleteById(id);

        return ResponseEntity.noContent().build();
    }
}
