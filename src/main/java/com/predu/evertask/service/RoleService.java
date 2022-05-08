package com.predu.evertask.service;

import com.predu.evertask.domain.model.Role;
import com.predu.evertask.domain.model.User;
import com.predu.evertask.repository.RoleRepository;
import com.predu.evertask.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class RoleService {

    private final RoleRepository roleRepository;
    private final UserRepository userRepository;

    public User addRoleToUser(UUID userId, String authority) {

        User user = userRepository.getById(userId);
        Role role = roleRepository.findByAuthority(authority);

        Set<Role> roles = user.getAuthorities();
        roles.add(role);
        user.setAuthorities(roles);

        return user;
    }

    public User removeRoleFromUser(UUID userId, String authority) {

        User user = userRepository.getById(userId);
        Role role = roleRepository.findByAuthority(authority);

        Set<Role> roles = user.getAuthorities();
        roles.remove(role);
        user.setAuthorities(roles);

        return user;
    }

    public User persistUser(User user) {
        return userRepository.save(user);
    }
}
