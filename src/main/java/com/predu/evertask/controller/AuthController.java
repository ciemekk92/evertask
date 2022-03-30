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
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
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
        try {
            Authentication authenticate = authenticationManager
                    .authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));

            User user = (User) authenticate.getPrincipal();

            String refreshToken = RandomToken.generateRandomToken(32);
            String token = jwtTokenUtil.generateAccessToken(user);

            userService.updateRefreshToken(user,
                    refreshToken,
                    new Date(System.currentTimeMillis() + 7 * 24 * 60 * 60 * 1000L)
            );

            Cookie cookie = new Cookie("refresh", refreshToken);

            cookie.setHttpOnly(true);
            cookie.setMaxAge(7 * 24 * 60 * 60);

            response.addCookie(cookie);

            UserDto userDto = userViewMapper.toUserDto(user);
            UserAuthDto userAuthDto = new UserAuthDto(userDto, token);

            return ResponseEntity.ok()
                    .body(userAuthDto);
        } catch (BadCredentialsException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
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
    public ResponseEntity<RefreshResponseDto> refresh(@CookieValue(name = "refresh") String refreshToken) throws InvalidTokenException {
        if (refreshToken == null) {
            throw new InvalidTokenException("tokenInvalid");
        }

        User user = userService.findByRefreshToken(refreshToken);

        if (user.getRefreshTokenExpiryDate().getTime() < System.currentTimeMillis()) {
            userService.updateRefreshToken(user, null, null);

            throw new InvalidTokenException("expired");
        }

        String newAccessToken = jwtTokenUtil.generateAccessToken(user);

        return ResponseEntity.status(200).body(new RefreshResponseDto(newAccessToken));
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
