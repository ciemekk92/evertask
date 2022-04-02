package com.predu.evertask.controller;

import com.predu.evertask.config.security.JwtTokenUtil;
import com.predu.evertask.domain.dto.auth.*;
import com.predu.evertask.domain.mapper.UserViewMapper;
import com.predu.evertask.domain.model.User;
import com.predu.evertask.domain.model.VerificationToken;
import com.predu.evertask.event.OnSignupCompleteEvent;
import com.predu.evertask.exception.InvalidTokenException;
import com.predu.evertask.repository.VerificationTokenRepository;
import com.predu.evertask.service.UserService;
import com.predu.evertask.util.RandomToken;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.util.Calendar;
import java.util.Date;

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

    @PostMapping("login")
    public ResponseEntity<UserAuthDto> login(@RequestBody @Valid AuthRequest request, HttpServletResponse response) {

            Authentication authenticate = authenticationManager
                    .authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));

            User user = (User) authenticate.getPrincipal();

            String refreshToken = RandomToken.generateRandomToken(32);
            String token = jwtTokenUtil.generateAccessToken(user);

            userService.updateRefreshToken(user,
                    refreshToken,
                    new Date(System.currentTimeMillis() + 7 * 24 * 60 * 60 * 1000L)
            );

            ResponseCookie cookie = ResponseCookie.from("refresh", refreshToken)
                    .httpOnly(true)
                    .sameSite("None")
                    .secure(true)
                    .path("/")
                    .maxAge(7 * 24 * 60 * 60L)
                    .build();

            response.addHeader("Set-Cookie", cookie.toString());

            UserDto userDto = userViewMapper.toUserDto(user);

            // TODO: For development, refresh token should be set in localStorage
            UserAuthDto userAuthDto = new UserAuthDto(userDto, token, refreshToken);

            return ResponseEntity.ok().body(userAuthDto);
    }

    @PostMapping("signup")
    public ResponseEntity<UserDto> signup(@RequestBody @Valid CreateUserRequest request, HttpServletRequest servletRequest) {

        User user = userService.create(request);

        String appUrl = servletRequest.getContextPath();
        eventPublisher.publishEvent(new OnSignupCompleteEvent(user, servletRequest.getLocale(), appUrl));

        return ResponseEntity.status(201).build();
    }

    @PutMapping("confirm_signup")
    public ResponseEntity<UserDto> confirmSignup(@RequestParam("token") String token) throws InvalidTokenException {
        VerificationToken verificationToken = userService.getVerificationToken(token);

        if (verificationToken == null) {
            throw new InvalidTokenException("tokenInvalid");
        }

        User user = verificationToken.getUser();
        Calendar cal = Calendar.getInstance();

        if ((verificationToken.getExpiryDate().getTime() - cal.getTime().getTime()) <= 0) {
            throw new InvalidTokenException("expired");
        }

        UserDto result = userService.updateEnabled(user.getId(), true);

        verificationTokenRepository.delete(verificationToken);

        return ResponseEntity.status(200).body(result);
    }

    @PostMapping("refresh")
    public ResponseEntity<UserAuthDto> refresh(@RequestParam("refreshToken") String refreshToken) throws InvalidTokenException {
        if (refreshToken == null) {
            throw new InvalidTokenException("tokenInvalid");
        }

        User user = userService.findByRefreshToken(refreshToken);

        if (user.getRefreshTokenExpiryDate().getTime() < System.currentTimeMillis()) {
            userService.updateRefreshToken(user, null, null);

            throw new InvalidTokenException("expired");
        }

        UserDto userDto = userViewMapper.toUserDto(user);
        String newAccessToken = jwtTokenUtil.generateAccessToken(user);

        UserAuthDto userAuthDto = new UserAuthDto(userDto, newAccessToken, refreshToken);

        return ResponseEntity.status(200).body(userAuthDto);
    }

    @PostMapping("logout")
    public ResponseEntity<String> logout(Authentication authentication) throws IllegalAccessException {
        if (authentication == null) {
            throw new IllegalAccessException("No user logged in.");
        }

        User user = (User) authentication.getPrincipal();

        userService.updateRefreshToken(user, null, null);

        return ResponseEntity.status(200).build();
    }
}
