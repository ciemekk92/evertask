package com.predu.evertask.controller;

import com.predu.evertask.annotation.IsAdmin;
import com.predu.evertask.annotation.IsOrganisationAdminOrAdmin;
import com.predu.evertask.annotation.IsUnassignedUserOrAdmin;
import com.predu.evertask.domain.dto.organisation.InviteUserRequest;
import com.predu.evertask.domain.dto.organisation.OrganisationCreateDto;
import com.predu.evertask.domain.dto.organisation.OrganisationDto;
import com.predu.evertask.domain.dto.organisation.OrganisationInvitationDto;
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

    @GetMapping("/{id}")
    public ResponseEntity<OrganisationDto> getOrganisation(@PathVariable UUID id) {
        return organisationService.findById(id)
                .map(organisationMapper::organisationToOrganisationDto)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @IsOrganisationAdminOrAdmin
    @GetMapping("/{id}/invitations")
    public ResponseEntity<List<OrganisationInvitationDto>> getInvitationsForOrganisation(@PathVariable UUID id) {
        return ResponseEntity.ok(invitationService.findAllByOrganisation(id));
    }

    @IsUnassignedUserOrAdmin
    @PostMapping
    public ResponseEntity<OrganisationCreateDto> createOrganisation(@RequestBody @Valid OrganisationCreateDto toCreate,
                                                                    Authentication authentication)
            throws URISyntaxException, IllegalAccessException {

        if (authentication == null) {
            throw new IllegalAccessException("No user logged in.");
        }

        User user = (User) authentication.getPrincipal();

        Organisation created = organisationService.create(toCreate, user);

        return ResponseEntity
                .created(new URI("http://localhost:8080/api/organisations/" + created.getId()))
                .body(toCreate);
    }

    @IsOrganisationAdminOrAdmin
    @PostMapping("/{id}/invite_user")
    public ResponseEntity<Void> inviteUser(@RequestBody @Valid InviteUserRequest request, @PathVariable UUID id, HttpServletRequest servletRequest) {
        UUID userId = request.getUserId();
        invitationService.create(userId, id, servletRequest.getLocale());

        return ResponseEntity.status(201).build();
    }

    @IsOrganisationAdminOrAdmin
    @PutMapping("/{id}")
    public ResponseEntity<Void> updateOrganisation(@RequestBody @Valid OrganisationDto toUpdate, @PathVariable UUID id) {
        if (!organisationService.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        organisationService.findById(id).ifPresent(org -> organisationService.update(id, toUpdate));

        return ResponseEntity.noContent().build();
    }

    @IsOrganisationAdminOrAdmin
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrganisation(@PathVariable UUID id) {
        if (!organisationService.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        organisationService.deleteById(id);

        return ResponseEntity.noContent().build();
    }
}
