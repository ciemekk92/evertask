package com.predu.evertask.service;

import com.predu.evertask.domain.dto.auth.CreateUserRequest;
import com.predu.evertask.domain.dto.auth.UpdateUserRequest;
import com.predu.evertask.domain.dto.user.UserDetailsUpdateDto;
import com.predu.evertask.domain.dto.user.UserDto;
import com.predu.evertask.domain.dto.user.UserSettingsDto;
import com.predu.evertask.domain.mapper.UserEditMapper;
import com.predu.evertask.domain.mapper.UserSettingsMapper;
import com.predu.evertask.domain.mapper.UserViewMapper;
import com.predu.evertask.domain.model.*;
import com.predu.evertask.exception.NotFoundException;
import com.predu.evertask.repository.RoleRepository;
import com.predu.evertask.repository.UserRepository;
import com.predu.evertask.repository.UserSettingsRepository;
import com.predu.evertask.repository.VerificationTokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.ValidationException;
import java.io.IOException;
import java.util.*;

import static java.lang.String.format;

@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final VerificationTokenRepository tokenRepository;
    private final UserSettingsRepository userSettingsRepository;
    private final UserEditMapper userEditMapper;
    private final UserViewMapper userViewMapper;
    private final UserSettingsMapper userSettingsMapper;
    private final PasswordEncoder passwordEncoder;
    private final ImageService imageService;

    @Transactional(propagation = Propagation.REQUIRED, readOnly = true, noRollbackFor = Exception.class)
    public List<UserDto> getUnassignedUsers(String query) {
        List<User> userList;
        if (query == null) {
            userList = userRepository.findUnassigned();
        } else {
            userList = userRepository.findUnassignedByUsernameOrEmail(query, query);
        }

        return userList.stream()
                .map(userViewMapper::toUserDto)
                .toList();
    }

    @Transactional
    public User create(CreateUserRequest request) {
        if (usernameExists(request.getUsername())) {
            throw new ValidationException("usernameExists");
        }

        if (emailExists(request.getEmail())) {
            throw new ValidationException("emailTaken");
        }

        if (!request.getPassword().equals(request.getRePassword())) {
            throw new ValidationException("passwordsMatch");
        }

        User user = userEditMapper.create(request);
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        Role role = roleRepository.findByAuthority(Role.ROLE_UNASSIGNED_USER);
        user.setAuthorities(Set.of(role));

        user = userRepository.save(user);

        return user;
    }

    @Transactional
    public UserDto update(UUID id, UpdateUserRequest request) {
        User user = userRepository.getById(id);
        userEditMapper.update(request, user);

        user = userRepository.save(user);

        return userViewMapper.toUserDto(user);
    }

    @Transactional
    public UserDto updateUserDetails(UUID id, UserDetailsUpdateDto dto) {

        User user = userRepository.getById(id);

        userEditMapper.updateDetails(dto, user);

        user = userRepository.save(user);

        return userViewMapper.toUserDto(user);
    }

    @Transactional
    public void updateUserSettings(UUID id, UserSettingsDto dto) {

        User user = userRepository.getById(id);

        UserSettings newSettings = userSettingsMapper.update(user.getUserSettings(), dto);

        userSettingsRepository.save(newSettings);
    }

    @Transactional
    public UserDto uploadAvatar(UUID id, MultipartFile file) throws IOException {

        User user = userRepository.getById(id);

        if (user.getAvatar() != null) {
            imageService.deleteImageById(user.getAvatar().getId());
        }

        Image image = imageService.saveImage(file);

        user.setAvatar(image);
        user = userRepository.save(user);

        return userViewMapper.toUserDto(user);
    }

    @Transactional
    public void removeAvatar(UUID id) {
        User user = userRepository.getById(id);
        UUID avatarId = user.getAvatar().getId();

        if (user.getAvatar() != null) {
            user.setAvatar(null);
            userRepository.save(user);

            imageService.deleteImageById(avatarId);
        }
    }

    @Transactional
    public User updateRefreshToken(User user, String token, Date expiryDate) {
        user.setRefreshToken(token);
        user.setRefreshTokenExpiryDate(expiryDate);

        return userRepository.save(user);
    }

    @Transactional
    public UserDto updateEnabled(UUID id, boolean isEnabled) {
        Optional<User> optionalUser = userRepository.findById(id);

        if (optionalUser.isEmpty()) {
            throw new NotFoundException(User.class, id);
        }

        User user = optionalUser.get();
        user.setEnabled(isEnabled);
        user = userRepository.save(user);

        return userViewMapper.toUserDto(user);
    }

    @Transactional
    public UserDto upsert(CreateUserRequest request) {
        Optional<User> optionalUser = userRepository.findByUsername(request.getUsername());

        if (optionalUser.isEmpty()) {
            return userViewMapper.toUserDto(create(request));
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

    public List<UserDto> getProjectActiveMembers(UUID projectId) {
        return userRepository.findActiveProjectMembers(projectId)
                .stream()
                .map(userViewMapper::toUserDto)
                .toList();
    }

    public List<UserDto> getSprintActiveMembers(UUID sprintId) {
        return userRepository.findActiveSprintMembers(sprintId)
                .stream()
                .map(userViewMapper::toUserDto)
                .toList();
    }

    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository
                .findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException(format("User with username - %s, not found", username)));
    }

    public boolean usernameExists(String username) {
        return userRepository.findByUsername(username).isPresent();
    }

    public boolean emailExists(String email) {
        return userRepository.findByEmail(email).isPresent();
    }

    public UserDto getUser(UUID id) {
        return userViewMapper.toUserDto(userRepository.getById(id));
    }

    public User findByRefreshToken(String token) {
        return userRepository
                .findByRefreshToken(token)
                .orElseThrow(() -> new UsernameNotFoundException("User not found."));
    }

    @Transactional
    public void createVerificationToken(User user, String token) {
        VerificationToken verificationToken = new VerificationToken(token, user);

        tokenRepository.save(verificationToken);
    }

    @Transactional
    public VerificationToken getVerificationToken(String verificationToken) {
        return tokenRepository.findByToken(verificationToken);
    }
}
