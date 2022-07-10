package com.predu.evertask.controller;

import com.predu.evertask.annotation.IsNotUnassignedUser;
import com.predu.evertask.annotation.IsOrganisationAdminOrAdmin;
import com.predu.evertask.annotation.IsUnassignedUser;
import com.predu.evertask.domain.dto.user.UserDto;
import com.predu.evertask.domain.dto.organisation.OrganisationDto;
import com.predu.evertask.domain.dto.organisation.OrganisationInvitationDto;
import com.predu.evertask.domain.model.User;
import com.predu.evertask.service.OrganisationInvitationService;
import com.predu.evertask.service.OrganisationService;
import com.predu.evertask.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@Controller
@RequestMapping("api/user")
public class UserController {

    private final OrganisationInvitationService organisationInvitationService;
    private final OrganisationService organisationService;
    private final UserService userService;

    @PostMapping("/upload_avatar")
    public ResponseEntity<UserDto> uploadAvatar(@RequestParam("imageFile") MultipartFile file,
                                                Authentication authentication) throws IOException {

        User user = (User) authentication.getPrincipal();

        return ResponseEntity.ok(userService.uploadAvatar(user.getId(), file));
    }

    @DeleteMapping("/remove_avatar")
    public ResponseEntity<Void> removeAvatar(Authentication authentication) {

        User user = (User) authentication.getPrincipal();

        userService.removeAvatar(user.getId());

        return ResponseEntity.noContent().build();
    }

    @IsUnassignedUser
    @GetMapping("/organisation_invitations")
    public ResponseEntity<List<OrganisationInvitationDto>> getUserOrganisationInvitations(Authentication authentication)
            throws IllegalAccessException {

        if (authentication == null) {
            throw new IllegalAccessException("No user logged in.");
        }

        UUID userId = ((User) authentication.getPrincipal()).getId();

        return ResponseEntity.ok(organisationInvitationService.findAllByUser(userId));
    }

    @GetMapping("/me")
    public ResponseEntity<UserDto> getCurrentUserDetails(Authentication authentication)
            throws IllegalAccessException {

        if (authentication == null) {
            throw new IllegalAccessException("No user logged in.");
        }

        User user = (User) authentication.getPrincipal();

        return ResponseEntity.ok(userService.getUser(user.getId()));
    }

    @IsNotUnassignedUser
    @GetMapping("/organisation")
    public ResponseEntity<OrganisationDto> getUserOrganisation(Authentication authentication) throws IllegalAccessException {

        if (authentication == null) {
            throw new IllegalAccessException("No user logged in.");
        }

        User user = (User) authentication.getPrincipal();

        return ResponseEntity.ok(organisationService.getUserOrganisation(user.getId()));
    }

    @IsOrganisationAdminOrAdmin
    @GetMapping("/unassigned")
    public ResponseEntity<List<UserDto>> getUnassignedUsersByUsernameOrEmail(@RequestParam(required = false) String query) {

        return ResponseEntity.ok(userService.getUnassignedUsers(query));
    }
}
