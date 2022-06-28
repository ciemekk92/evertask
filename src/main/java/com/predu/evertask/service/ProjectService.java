package com.predu.evertask.service;

import com.predu.evertask.domain.dto.project.ProjectCreateDto;
import com.predu.evertask.domain.dto.project.ProjectDto;
import com.predu.evertask.domain.dto.project.ProjectUpdateDto;
import com.predu.evertask.domain.dto.sprint.EndSprintDto;
import com.predu.evertask.domain.dto.sprint.StartSprintDto;
import com.predu.evertask.domain.mapper.ProjectMapper;
import com.predu.evertask.domain.model.*;
import com.predu.evertask.exception.InvalidOperationException;
import com.predu.evertask.exception.NotFoundException;
import com.predu.evertask.repository.IssueRepository;
import com.predu.evertask.repository.ProjectRepository;
import com.predu.evertask.repository.SprintRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

@RequiredArgsConstructor
@Service
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final ProjectMapper projectMapper;
    private final RoleService roleService;
    private final SprintRepository sprintRepository;
    private final IssueRepository issueRepository;

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

    public void startSprint(UUID projectId, StartSprintDto dto) throws InvalidOperationException {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new NotFoundException(Project.class, projectId));
        Sprint sprint = sprintRepository.findById(UUID.fromString(dto.getSprintId()))
                .orElseThrow(() -> new NotFoundException(Sprint.class, dto.getSprintId()));

        project.setActiveSprint(sprint);

        projectRepository.save(project);
    }

    public void endSprint(UUID projectId, EndSprintDto dto) throws InvalidOperationException {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new NotFoundException(Project.class, projectId));
        Sprint sprint = sprintRepository.findById(UUID.fromString(dto.getSprintId()))
                .orElseThrow(() -> new NotFoundException(Sprint.class, dto.getSprintId()));

        if (sprint.isCompleted()) {
            throw new InvalidOperationException("completed");
        }

        project.setActiveSprint(null);
        sprint.setCompleted(true);

        projectRepository.save(project);
        sprintRepository.save(sprint);

        Optional<Sprint> sprintToMoveTo = sprintRepository.findById(UUID.fromString(dto.getSprintIdToMoveTo()));

        Set<Issue> sprintIssues = sprint.getIssues();
        for (Issue issue : sprintIssues) {
            issue.setSprint(sprintToMoveTo.orElse(null));
        }

        issueRepository.saveAll(sprintIssues);
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
