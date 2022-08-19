package com.predu.evertask.controller;

import com.predu.evertask.annotation.IsNotUnassignedUser;
import com.predu.evertask.annotation.IsOrganisationAdminOrAdmin;
import com.predu.evertask.annotation.IsUnassignedUser;
import com.predu.evertask.annotation.IsUserAllowedToUpdateUser;
import com.predu.evertask.config.security.CurrentUserId;
import com.predu.evertask.domain.dto.organisation.OrganisationDto;
import com.predu.evertask.domain.dto.organisation.OrganisationInvitationDto;
import com.predu.evertask.domain.dto.user.UserDetailsUpdateDto;
import com.predu.evertask.domain.dto.user.UserDto;
import com.predu.evertask.domain.dto.user.UserSettingsDto;
import com.predu.evertask.service.OrganisationInvitationService;
import com.predu.evertask.service.OrganisationService;
import com.predu.evertask.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
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

    @IsUserAllowedToUpdateUser
    @PutMapping("/{id}/update_details")
    public ResponseEntity<UserDto> updateUserDetails(@PathVariable UUID id,
                                                     @RequestBody @Valid UserDetailsUpdateDto dto) {

        userService.updateUserDetails(id, dto);

        return ResponseEntity.noContent().build();
    }

    @IsUserAllowedToUpdateUser
    @PutMapping("/update_interface")
    public ResponseEntity<Void> updateUserSettings(@RequestBody @Valid UserSettingsDto dto,
                                                   @CurrentUserId UUID userId) {

        userService.updateUserSettings(userId, dto);

        return ResponseEntity.noContent().build();
    }

    @PostMapping("/upload_avatar")
    public ResponseEntity<UserDto> uploadAvatar(@RequestParam("imageFile") MultipartFile file,
                                                @CurrentUserId UUID userId)
            throws IOException {

        return ResponseEntity.ok(userService.uploadAvatar(userId, file));
    }

    @DeleteMapping("/remove_avatar")
    public ResponseEntity<Void> removeAvatar(@CurrentUserId UUID userId) {

        userService.removeAvatar(userId);

        return ResponseEntity.noContent().build();
    }

    @IsUnassignedUser
    @GetMapping("/organisation_invitations")
    public ResponseEntity<List<OrganisationInvitationDto>> getUserOrganisationInvitations(@CurrentUserId UUID userId) {

        return ResponseEntity.ok(organisationInvitationService.findAllByUser(userId));
    }

    @GetMapping("/me")
    public ResponseEntity<UserDto> getCurrentUserDetails(@CurrentUserId UUID userId) {

        return ResponseEntity.ok(userService.getUser(userId));
    }

    @IsNotUnassignedUser
    @GetMapping("/organisation")
    public ResponseEntity<OrganisationDto> getUserOrganisation(@CurrentUserId UUID userId) {

        return ResponseEntity.ok(organisationService.getUserOrganisation(userId));
    }

    @IsOrganisationAdminOrAdmin
    @GetMapping("/unassigned")
    public ResponseEntity<List<UserDto>> getUnassignedUsersByUsernameOrEmail(@RequestParam(required = false) String query) {

        return ResponseEntity.ok(userService.getUnassignedUsers(query));
    }
}
