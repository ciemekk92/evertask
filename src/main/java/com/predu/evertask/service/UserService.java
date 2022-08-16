package com.predu.evertask.service;

import com.predu.evertask.config.security.JwtTokenUtil;
import com.predu.evertask.domain.dto.auth.*;
import com.predu.evertask.domain.dto.user.UserDetailsUpdateDto;
import com.predu.evertask.domain.dto.user.UserDto;
import com.predu.evertask.domain.dto.user.UserSettingsDto;
import com.predu.evertask.domain.mapper.UserEditMapper;
import com.predu.evertask.domain.mapper.UserSettingsMapper;
import com.predu.evertask.domain.mapper.UserViewMapper;
import com.predu.evertask.domain.model.*;
import com.predu.evertask.exception.InvalidMFACodeException;
import com.predu.evertask.exception.NotFoundException;
import com.predu.evertask.repository.RoleRepository;
import com.predu.evertask.repository.UserRepository;
import com.predu.evertask.repository.UserSettingsRepository;
import com.predu.evertask.repository.VerificationTokenRepository;
import com.predu.evertask.util.RandomToken;
import dev.samstevens.totp.exceptions.QrGenerationException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseCookie;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import javax.validation.ValidationException;
import java.io.IOException;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;
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
    private final MfaTokenManager mfaTokenManager;
    private final JwtTokenUtil jwtTokenUtil;
    private final ImageService imageService;

    /**
     * <p>Method logging user into application. If the user has MFA enabled, 5 minute accessToken is generated,
     * which only allows the user to finish MFA process, otherwise, regular 1 hour accessToken is issued
     * along with refresh token.</p>
     *
     * @param userId   current user ID
     * @param response HttpResponse to be passed, when MFA is disabled
     * @return DTO with tokens and state of MFA
     */
    @Transactional
    public AuthResponseDto loginUser(UUID userId, HttpServletResponse response) {

        User user = userRepository.getById(userId);

        if (user.isMfaEnabled()) {
            String accessToken = jwtTokenUtil.generateAccessToken(user, false);

            return AuthResponseDto
                    .builder()
                    .accessToken(accessToken)
                    .mfaEnabled(user.isMfaEnabled())
                    .build();
        } else {
            return issueTokens(userId, response);
        }
    }

    /**
     * Method creating access and refresh tokens, which are used by front-end to access API resources
     *
     * @param userId   current user ID
     * @param response HttpResponse to attach cookie into
     * @return DTO with tokens and state of MFA
     */
    @Transactional
    public AuthResponseDto issueTokens(UUID userId, HttpServletResponse response) {

        User user = userRepository.getById(userId);
        String accessToken = jwtTokenUtil.generateAccessToken(user, true);
        String refreshToken = RandomToken.generateRandomToken(32);

        updateRefreshToken(user,
                refreshToken,
                new Date(System.currentTimeMillis() + 7 * 24 * 60 * 60 * 1000L).toInstant().atOffset(ZoneOffset.UTC)
        );

        ResponseCookie cookie = ResponseCookie.from("refresh", refreshToken)
                .httpOnly(true)
                .sameSite("None")
                .secure(true)
                .path("/")
                .maxAge(7 * 24 * 60 * 60L)
                .build();

        response.addHeader("Set-Cookie", cookie.toString());

        return AuthResponseDto
                .builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .mfaEnabled(user.isMfaEnabled())
                .build();
    }

    /**
     * Method verifying whether the provided TOTP code is valid, and logging user in if it is.
     *
     * @param userId   current user ID
     * @param dto      Request body containing MFA code
     * @param response HttpResponse to attach cookie to
     * @return DTO with tokens and state of MFA
     * @throws InvalidMFACodeException - in case of invalid MFA Code, this error would be intercepted by
     *                                 global exception handler
     */
    @Transactional
    public AuthResponseDto verifyMFA(UUID userId, VerifyCodeDto dto, HttpServletResponse response)
            throws InvalidMFACodeException {

        User user = userRepository.getById(userId);

        if (dto != null && !mfaTokenManager.verifyTotp(dto.getCode(), user.getSecret())) {
            throw new InvalidMFACodeException("");
        }

        return issueTokens(userId, response);
    }

    /**
     * Method allowing to change the status of MFA an current user's account
     *
     * @param userId  current user ID
     * @param request request DTO containing whether MFA should be enabled or not
     * @return response DTO with new state of MFA and QR code, if MFA was enabled
     * @throws QrGenerationException can be thrown in case of errors during QR generation, like incorrect secret
     */
    @Transactional
    public MfaUpdateResponseDto updateMfa(UUID userId, MfaUpdateRequestDto request) throws QrGenerationException {

        User user = userRepository.getById(userId);

        MfaUpdateResponseDto response;

        if (request.isMfaEnabled()) {
            String secret = mfaTokenManager.generateSecretKey();
            String qrImage = mfaTokenManager.getQrCode(secret);

            user.setSecret(secret);
            response = MfaUpdateResponseDto.builder()
                    .mfaEnabled(request.isMfaEnabled())
                    .qrCodeImage(qrImage)
                    .build();
        } else {
            user.setSecret(null);
            response = MfaUpdateResponseDto.builder()
                    .mfaEnabled(false)
                    .build();
        }

        user.setMfaEnabled(request.isMfaEnabled());
        userRepository.save(user);

        return response;
    }

    /**
     * Method allowing users to change their password.
     *
     * @param userId     current user ID
     * @param requestDto DTO containing current password with confirmation and new password
     */
    public void changePassword(UUID userId, ChangePasswordRequestDto requestDto) {

        if (!requestDto.getPassword().equals(requestDto.getRePassword())) {
            throw new ValidationException("passwordsMatch");
        }

        User user = userRepository.getById(userId);

        if (!passwordEncoder.matches(requestDto.getPassword(), user.getPassword())) {
            throw new ValidationException("passwordIncorrect");
        }

        if (passwordEncoder.matches(requestDto.getNewPassword(), user.getPassword())) {
            throw new ValidationException("newPasswordSameAsOld");
        }

        user.setPassword(passwordEncoder.encode(requestDto.getNewPassword()));
        userRepository.save(user);
    }

    /**
     * Method allowing to get all the users not assigned to any organisation
     *
     * @param query optional query to search for specific users
     * @return list of users not assigned to any organisation
     */
    @Transactional(propagation = Propagation.REQUIRED, readOnly = true, noRollbackFor = Exception.class)
    public List<UserDto> getUnassignedUsers(String query) {
        List<User> userList;
        if (query == null) {
            userList = userRepository.findUnassigned();
        } else {
            userList = userRepository.findUnassignedByUsernameOrEmail(query);
        }

        return userList.stream()
                .map(userViewMapper::toUserDto)
                .toList();
    }

    /**
     * Method creating new user
     *
     * @param request DTO containing user signup data
     * @return User entity
     */
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
        // TODO: remove or merge with updateUserDetails

        User user = userRepository.getById(id);
        userEditMapper.update(request, user);

        user = userRepository.save(user);

        return userViewMapper.toUserDto(user);
    }

    @Transactional
    public void updateUserDetails(UUID id, UserDetailsUpdateDto dto) {

        User user = userRepository.getById(id);

        userEditMapper.updateDetails(dto, user);

        userRepository.save(user);
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
    public void updateRefreshToken(User user, String token, OffsetDateTime expiryDate) {
        user.setRefreshToken(token);
        user.setRefreshTokenExpiryDate(expiryDate);

        userRepository.save(user);
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
        // TODO: remove if won't be needed
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
