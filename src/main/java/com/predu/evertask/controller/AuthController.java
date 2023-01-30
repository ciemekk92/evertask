package com.predu.evertask.controller;

import com.predu.evertask.annotation.CurrentUserId;
import com.predu.evertask.config.security.JwtTokenUtil;
import com.predu.evertask.domain.dto.auth.*;
import com.predu.evertask.domain.dto.user.UserAuthDto;
import com.predu.evertask.domain.dto.user.UserDto;
import com.predu.evertask.domain.mapper.UserViewMapper;
import com.predu.evertask.domain.model.User;
import com.predu.evertask.domain.model.VerificationToken;
import com.predu.evertask.event.OnResetPasswordCompleteEvent;
import com.predu.evertask.event.OnSignupCompleteEvent;
import com.predu.evertask.exception.InvalidMFACodeException;
import com.predu.evertask.exception.InvalidTokenException;
import com.predu.evertask.repository.VerificationTokenRepository;
import com.predu.evertask.service.UserService;
import dev.samstevens.totp.exceptions.QrGenerationException;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import javax.validation.ValidationException;
import java.time.OffsetDateTime;
import java.util.Optional;
import java.util.UUID;

@RequiredArgsConstructor
@RestController
@RequestMapping(path = "api/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final VerificationTokenRepository verificationTokenRepository;
    private final JwtTokenUtil jwtTokenUtil;
    private final UserViewMapper userViewMapper;
    private final UserService userService;
    private final ApplicationEventPublisher eventPublisher;

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDto> login(@RequestBody @Valid AuthRequest request,
                                                 HttpServletResponse response) {

        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));

        User user = (User) authentication.getPrincipal();

        return ResponseEntity.ok(userService.loginUser(user.getId(), response));
    }

    @PostMapping("/verify")
    @PreAuthorize("hasAnyRole({'ROLE_PRE_VERIFICATION_USER', 'ROLE_ADMIN'})")
    public ResponseEntity<AuthResponseDto> verifyCode(@RequestBody @Valid VerifyCodeDto dto,
                                                      @CurrentUserId UUID userId,
                                                      HttpServletResponse response) throws InvalidMFACodeException {

        return ResponseEntity.ok(userService.verifyMFA(userId, dto, response));
    }

    @PostMapping("/update_mfa")
    public ResponseEntity<MfaUpdateResponseDto> updateMfa(@RequestBody @Valid MfaUpdateRequestDto request,
                                                          @CurrentUserId UUID userID) throws QrGenerationException {

        return ResponseEntity.ok(userService.updateMfa(userID, request));
    }

    @PutMapping("/change_password")
    public ResponseEntity<Void> changePassword(@RequestBody @Valid ChangePasswordRequestDto request,
                                               @CurrentUserId UUID userId) {

        userService.changePassword(userId, request);

        return ResponseEntity.noContent().build();
    }

    @PutMapping("/reset_password")
    public ResponseEntity<Void> resetPassword(@RequestBody @Valid ResetPasswordRequest request, HttpServletRequest servletRequest) {

        Optional<String> tempPassword = userService.resetPassword(request);

        tempPassword.ifPresent(s -> eventPublisher.publishEvent(new OnResetPasswordCompleteEvent(request.getEmail(), servletRequest.getLocale(), s)));

        return ResponseEntity.noContent().build();
    }

    @PostMapping("/signup")
    public ResponseEntity<UserDto> signup(@RequestBody @Valid CreateUserRequest request,
                                          HttpServletRequest servletRequest)
            throws ValidationException {

        User user = userService.create(request);

        String appUrl = servletRequest.getContextPath();
        eventPublisher.publishEvent(new OnSignupCompleteEvent(user, servletRequest.getLocale(), appUrl));

        return ResponseEntity.status(201).build();
    }

    @PutMapping("/confirm_signup")
    public ResponseEntity<UserDto> confirmSignup(@RequestParam("token") String token) throws InvalidTokenException {
        VerificationToken verificationToken = userService.getVerificationToken(token);

        User user = verificationToken.getUser();

        if ((verificationToken.getExpiryDate().toEpochSecond() - OffsetDateTime.now().toEpochSecond()) <= 0) {
            throw new InvalidTokenException("expired");
        }

        UserDto result = userService.updateEnabled(user.getId(), true);
        verificationTokenRepository.delete(verificationToken);

        return ResponseEntity.status(200).body(result);
    }

    @PostMapping("/refresh")
    public ResponseEntity<UserAuthDto> refresh(@RequestParam(name = "refreshToken") String refreshToken) throws InvalidTokenException {

        User user = userService.findByRefreshToken(refreshToken);

        if (user.getRefreshTokenExpiryDate().toInstant().toEpochMilli() < System.currentTimeMillis()) {
            userService.updateRefreshToken(user, null, null);

            throw new InvalidTokenException("expired");
        }

        UserDto userDto = userViewMapper.toUserDto(user);
        String newAccessToken = jwtTokenUtil.generateAccessToken(user, true);
        String organisationId = user.getOrganisation() != null ? user.getOrganisation().getId().toString() : null;

        UserAuthDto userAuthDto = new UserAuthDto(userDto, newAccessToken, refreshToken, user.getAuthorities(), organisationId, user.isMfaEnabled());

        return ResponseEntity.status(200).body(userAuthDto);
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(@CurrentUserId UUID userId) {

        userService.updateRefreshToken(userId, null, null);

        return ResponseEntity.status(200).build();
    }
}
