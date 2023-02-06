package com.predu.evertask.service;

import com.predu.evertask.domain.dto.project.ProjectCreateDto;
import com.predu.evertask.domain.dto.project.ProjectDto;
import com.predu.evertask.domain.dto.project.ProjectUpdateDto;
import com.predu.evertask.domain.dto.sprint.EndSprintDto;
import com.predu.evertask.domain.dto.sprint.StartSprintDto;
import com.predu.evertask.domain.enums.IssueStatus;
import com.predu.evertask.domain.mapper.ProjectMapper;
import com.predu.evertask.domain.model.*;
import com.predu.evertask.exception.InvalidOperationException;
import com.predu.evertask.exception.NotFoundException;
import com.predu.evertask.repository.IssueRepository;
import com.predu.evertask.repository.ProjectRepository;
import com.predu.evertask.repository.SprintRepository;
import com.predu.evertask.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.ZoneId;
import java.util.*;

@RequiredArgsConstructor
@Service
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final ProjectMapper projectMapper;
    private final RoleService roleService;
    private final SprintRepository sprintRepository;
    private final IssueRepository issueRepository;
    private final UserRepository userRepository;

    public List<ProjectDto> findAll() {
        return projectRepository.findAll()
                .stream()
                .map(projectMapper::projectToProjectDto)
                .toList();
    }

    public Optional<ProjectDto> findById(UUID id) {
        var optionalProject = projectRepository.findById(id);

        return optionalProject.map(projectMapper::projectToProjectDto);
    }

    public Project getById(UUID id) {
        return projectRepository.getById(id);
    }

    public List<ProjectDto> findAllByOrganisation(UUID organisationId) {
        return projectRepository.findAllByOrganisationId(organisationId)
                .stream()
                .map(projectMapper::projectToProjectDto)
                .toList();
    }

    public List<UUID> getProjectAdmins(UUID id) {
        return userRepository.findProjectAdmins(id);
    }

    public Project create(ProjectCreateDto toSave, User user) {
        Project project = projectMapper.projectCreateDtoToProject(toSave);

        project.setOrganisation(user.getOrganisation());
        project.setProjectAdmins(new HashSet<>(List.of(user)));

        project = projectRepository.save(project);

        if (user.getAuthorities().stream().noneMatch(role -> role.getAuthority().equals(Role.ROLE_ADMIN))) {
            var changedUser = roleService.addRoleToUser(user.getId(), Role.ROLE_PROJECT_ADMIN);
            roleService.persistUser(changedUser);
        }

        return project;
    }

    public Project update(UUID id, ProjectUpdateDto toUpdate) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new NotFoundException(Project.class, id));
        Project result = projectMapper.update(project, toUpdate);

        return projectRepository.save(result);
    }

    public void startSprint(UUID projectId, StartSprintDto dto) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new NotFoundException(Project.class, projectId));
        Sprint sprint = sprintRepository.findById(UUID.fromString(dto.getSprintId()))
                .orElseThrow(() -> new NotFoundException(Sprint.class, dto.getSprintId()));

        sprint.setStartDate(dto.getStartDate().atStartOfDay(ZoneId.systemDefault()).toOffsetDateTime());
        sprint.setFinishDate(dto.getFinishDate().atStartOfDay(ZoneId.systemDefault()).toOffsetDateTime());

        sprint = sprintRepository.save(sprint);
        project.setActiveSprint(sprint);

        projectRepository.save(project);
    }

    public void endSprint(UUID projectId, EndSprintDto dto) throws InvalidOperationException {

        Sprint sprint = sprintRepository.findById(UUID.fromString(dto.getSprintId()))
                .orElseThrow(() -> new NotFoundException(Sprint.class, dto.getSprintId()));

        if (sprint.isCompleted()) {
            throw new InvalidOperationException("completed");
        }

        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new NotFoundException(Project.class, projectId));

        project.setActiveSprint(null);
        sprint.setFinishDate(dto.getFinishDate().atStartOfDay(ZoneId.systemDefault()).toOffsetDateTime());
        sprint.setCompleted(true);

        Optional<Sprint> sprintToMoveTo;

        if (dto.getSprintIdToMoveTo() == null) {
            sprintToMoveTo = Optional.empty();
        } else {
            sprintToMoveTo = sprintRepository.findById(UUID.fromString(dto.getSprintIdToMoveTo()));
        }

        List<Issue> sprintIssues = sprint.getIssues();
        for (Issue issue : sprintIssues) {
            if (issue.getStatus() != IssueStatus.ACCEPTED)  {
                issue.setSprint(sprintToMoveTo.orElse(null));
            }
        }

        issueRepository.saveAll(sprintIssues);
        projectRepository.save(project);
        sprintRepository.save(sprint);
    }

    public boolean existsById(UUID id) {
        return projectRepository.existsById(id);
    }

    public void delete(Project toDelete) {
        projectRepository.delete(toDelete);
    }

    public void deleteById(UUID id) {
        projectRepository.deleteById(id);
    }
}
