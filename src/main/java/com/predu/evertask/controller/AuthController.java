package com.predu.evertask.controller;

import com.predu.evertask.config.security.JwtTokenUtil;
import com.predu.evertask.domain.dto.AuthRequest;
import com.predu.evertask.domain.dto.CreateUserRequest;
import com.predu.evertask.domain.dto.UserDto;
import com.predu.evertask.domain.mapper.UserViewMapper;
import com.predu.evertask.domain.model.User;
import com.predu.evertask.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping(path = "api/public")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenUtil jwtTokenUtil;
    private final UserViewMapper userViewMapper;
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    @PostMapping("login")
    public ResponseEntity<UserDto> login(@RequestBody @Valid AuthRequest request) {
        try {
            Authentication authenticate = authenticationManager
                    .authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), passwordEncoder.encode(request.getPassword())));

            User user = (User) authenticate.getPrincipal();

            return ResponseEntity.ok()
                    .header(HttpHeaders.AUTHORIZATION, jwtTokenUtil.generateAccessToken(user))
                    .body(userViewMapper.toUserDto(user));
        } catch (BadCredentialsException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @PostMapping("register")
    public UserDto register(@RequestBody @Valid CreateUserRequest request) {
        return userService.create(request);
    }
}
