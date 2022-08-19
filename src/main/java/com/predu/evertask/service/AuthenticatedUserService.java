package com.predu.evertask.service;

import com.predu.evertask.domain.dto.issue.IssueReportTimeDto;
import com.predu.evertask.domain.model.*;
import com.predu.evertask.exception.NotFoundException;
import com.predu.evertask.repository.*;
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
    private final IssueRepository issueRepository;
    private final IssueCommentRepository issueCommentRepository;
    private final SprintRepository sprintRepository;

    public boolean isOrganisationAdmin(UUID id) {

        UUID userId = getCurrentUserId();

        Optional<User> user = userRepository.findById(userId);
        Organisation organisation = organisationRepository.getById(id);

        return user.filter(value -> organisation
                        .getOrganisationAdmins()
                        .contains(value))
                .isPresent();
    }

    public boolean isProjectAdmin(UUID id) {

        UUID userId = getCurrentUserId();

        Optional<User> user = userRepository.findById(userId);
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new NotFoundException(Project.class, id));

        return user.filter(value -> project
                        .getProjectAdmins()
                        .contains(value))
                .isPresent();
    }

    public boolean isOrganisationMember(UUID id) {

        UUID userId = getCurrentUserId();

        Optional<User> user = userRepository.findById(userId);
        Organisation organisation = organisationRepository.findById(id)
                .orElseThrow(() -> new NotFoundException(Organisation.class, id));

        return user.filter(value -> organisation
                        .getMembers()
                        .contains(value))
                .isPresent();
    }

    public boolean isProjectMember(UUID id) {

        UUID userId = getCurrentUserId();

        Optional<User> user = userRepository.findById(userId);
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new NotFoundException(Project.class, id));

        return user.filter(value -> project
                        .getMembers()
                        .contains(value))
                .isPresent();
    }

    public boolean isAllowedToIssue(UUID id) {

        UUID userId = getCurrentUserId();

        Optional<User> user = userRepository.findById(userId);

        Issue issue = issueRepository.findById(id)
                .orElseThrow(() -> new NotFoundException(Issue.class, id));

        return user.filter(value -> issue
                        .getProject()
                        .getOrganisation()
                        .getId()
                        .equals(value.getOrganisation().getId()))
                .isPresent();
    }

    public boolean isAllowedToSprint(UUID id) {

        UUID userId = getCurrentUserId();

        Optional<User> user = userRepository.findById(userId);

        Sprint sprint = sprintRepository.findById(id)
                .orElseThrow(() -> new NotFoundException(Sprint.class, id));

        return user.filter(value -> sprint
                        .getProject()
                        .getMembers()
                        .contains(value))
                .isPresent();
    }

    public boolean isAllowedToUpdateUser(UUID id) {
        return getCurrentUserId().equals(id);
    }

    public boolean isCommentAuthor(UUID id) {

        UUID userId = getCurrentUserId();

        IssueComment comment = issueCommentRepository.findById(id)
                .orElseThrow(() -> new NotFoundException(IssueComment.class, id));

        return comment.getCreatedBy().equals(userId);
    }

    public boolean isAllowedToLogWorkOnIssue(IssueReportTimeDto dto) {

        UUID userId = getCurrentUserId();
        Optional<User> user = userRepository.findById(userId);

        Issue issue = issueRepository.findById(UUID.fromString(dto.getIssueId()))
                .orElseThrow(() -> new NotFoundException(Issue.class, dto.getIssueId()));

        return user.filter(value -> issue
                        .getProject()
                        .getOrganisation()
                        .getId()
                        .equals(value.getOrganisation().getId()))
                .isPresent();
    }

    private UUID getCurrentUserId() {

        return ((User) SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal())
                .getId();
    }
}
