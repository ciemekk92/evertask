package com.predu.evertask.service;

import com.predu.evertask.domain.dto.auth.CreateUserRequest;
import com.predu.evertask.domain.dto.auth.UpdateUserRequest;
import com.predu.evertask.domain.dto.auth.UserDto;
import com.predu.evertask.domain.mapper.UserEditMapper;
import com.predu.evertask.domain.mapper.UserViewMapper;
import com.predu.evertask.domain.model.User;
import com.predu.evertask.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.validation.ValidationException;
import java.util.HashSet;
import java.util.Optional;
import java.util.UUID;

import static java.lang.String.format;

@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private final UserEditMapper userEditMapper;
    private final UserViewMapper userViewMapper;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public UserDto create(CreateUserRequest request) {
        if (userRepository.findByUsername(request.getUsername()).isPresent()) {
            throw new ValidationException("Username already exists.");
        }

        if (!request.getPassword().equals(request.getRePassword())) {
            throw new ValidationException("Passwords don't match.");
        }

        if (request.getAuthorities() == null) {
            request.setAuthorities(new HashSet<>());
        }

        User user = userEditMapper.create(request);
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        user = userRepository.save(user);

        return userViewMapper.toUserDto(user);
    }

    @Transactional
    public UserDto update(UUID id, UpdateUserRequest request) {
        User user = userRepository.getById(id);
        userEditMapper.update(request, user);

        user = userRepository.save(user);

        return userViewMapper.toUserDto(user);
    }

    @Transactional
    public UserDto upsert(CreateUserRequest request) {
        Optional<User> optionalUser = userRepository.findByUsername(request.getUsername());

        if (optionalUser.isEmpty()) {
            return create(request);
        } else {
            UpdateUserRequest updateUserRequest = new UpdateUserRequest();
            updateUserRequest.setFirstName(request.getFirstName());
            updateUserRequest.setLastName(request.getLastName());

            return update(optionalUser.get().getId(), updateUserRequest);
        }
    }

    @Transactional
    public UserDto delete(UUID id) {
        User user = userRepository.getById(id);

        user.setUsername(user.getUsername().replace("@", format("_%s@", user.getId().toString())));
        user.setEnabled(false);
        user = userRepository.save(user);

        return userViewMapper.toUserDto(user);
    }

    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository
                .findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException(format("User with username - %s, not found", username)));
    }

    public boolean usernameExists(String username) {
        return userRepository.findByUsername(username).isPresent();
    }

    public UserDto getUser(UUID id) {
        return userViewMapper.toUserDto(userRepository.getById(id));
    }
}
