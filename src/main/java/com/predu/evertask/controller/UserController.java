package com.predu.evertask.controller;

import com.predu.evertask.annotation.IsOrganisationAdminOrAdmin;
import com.predu.evertask.domain.dto.auth.UserDto;
import com.predu.evertask.domain.dto.organisation.OrganisationInvitationDto;
import com.predu.evertask.domain.model.User;
import com.predu.evertask.service.OrganisationInvitationService;
import com.predu.evertask.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@Controller
@RequestMapping("api/user")
public class UserController {

    private final OrganisationInvitationService organisationInvitationService;
    private final UserService userService;

    @GetMapping("/organisation_invitations")
    public ResponseEntity<List<OrganisationInvitationDto>> getOrganisationInvitations(Authentication authentication) throws IllegalAccessException {
        if (authentication == null) {
            throw new IllegalAccessException("No user logged in.");
        }

        UUID userId = ((User) authentication.getPrincipal()).getId();

        return ResponseEntity.ok(organisationInvitationService.findAllByUser(userId));
    }

    @IsOrganisationAdminOrAdmin
    @GetMapping("/unassigned")
    public ResponseEntity<List<UserDto>> getUnassignedUsersByUsernameOrEmail(@RequestParam String query) {
        return ResponseEntity.ok(userService.getUnassignedUsers(query));
    }
}
