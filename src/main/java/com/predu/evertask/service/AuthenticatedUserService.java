package com.predu.evertask.service;

import com.predu.evertask.domain.model.Organisation;
import com.predu.evertask.domain.model.Project;
import com.predu.evertask.domain.model.User;
import com.predu.evertask.repository.OrganisationRepository;
import com.predu.evertask.repository.ProjectRepository;
import com.predu.evertask.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthenticatedUserService {

    private final UserRepository userRepository;
    private final OrganisationRepository organisationRepository;
    private final ProjectRepository projectRepository;

    public boolean isOrganisationAdmin(UUID id) {
        String username =  ((User)SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal())
                .getUsername();

        Optional<User> user = userRepository.findByUsername(username);
        Organisation organisation = organisationRepository.getById(id);

        return user.filter(value -> organisation
                .getOrganisationAdmins()
                .contains(value))
                .isPresent();
    }

    public boolean isProjectAdmin(UUID id) {
        String username =  ((User)SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal())
                .getUsername();

        Optional<User> user = userRepository.findByUsername(username);
        Project project = projectRepository.getById(id);

        return user.filter(value -> project
                .getProjectAdmins()
                .contains(value))
                .isPresent();
    }
}
