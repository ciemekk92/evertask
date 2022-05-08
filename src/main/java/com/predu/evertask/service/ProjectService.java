package com.predu.evertask.service;

import com.predu.evertask.domain.dto.auth.UserDto;
import com.predu.evertask.domain.dto.issue.IssueDto;
import com.predu.evertask.domain.dto.project.ProjectCreateDto;
import com.predu.evertask.domain.dto.project.ProjectDto;
import com.predu.evertask.domain.dto.project.ProjectUpdateDto;
import com.predu.evertask.domain.dto.sprint.SprintDto;
import com.predu.evertask.domain.mapper.IssueMapper;
import com.predu.evertask.domain.mapper.ProjectMapper;
import com.predu.evertask.domain.mapper.SprintMapper;
import com.predu.evertask.domain.mapper.UserViewMapper;
import com.predu.evertask.domain.model.Project;
import com.predu.evertask.domain.model.Role;
import com.predu.evertask.domain.model.User;
import com.predu.evertask.exception.NotFoundException;
import com.predu.evertask.repository.IssueRepository;
import com.predu.evertask.repository.ProjectRepository;
import com.predu.evertask.repository.SprintRepository;
import com.predu.evertask.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;
    private final SprintRepository sprintRepository;
    private final IssueRepository issueRepository;
    private final UserViewMapper userViewMapper;
    private final ProjectMapper projectMapper;
    private final SprintMapper sprintMapper;
    private final IssueMapper issueMapper;
    private final RoleService roleService;

    public List<ProjectDto> findAll() {
        return projectRepository.findAll()
                .stream()
                .map(projectMapper::projectToProjectDto)
                .collect(Collectors.toList());
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
                .collect(Collectors.toList());
    }

    public List<UserDto> getProjectActiveMembers(UUID projectId) {
        return userRepository.findActiveProjectMembers(projectId)
                .stream()
                .map(userViewMapper::toUserDto)
                .collect(Collectors.toList());
    }

    public List<SprintDto> getProjectSprints(UUID projectId) {
        return sprintRepository.findAllByProjectIdOrderByOrdinalDesc(projectId)
                .stream()
                .map(sprintMapper::sprintToSprintDto)
                .collect(Collectors.toList());
    }

    public List<IssueDto> getProjectLastIssues(UUID projectId) {
        return issueRepository.findTop10ByProjectIdOrderByCreatedAtDesc(projectId)
                .stream()
                .map(issueMapper::issueToIssueDto)
                .collect(Collectors.toList());
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

    public Project update(UUID id, ProjectUpdateDto toSave) {
        Optional<Project> optionalProject = projectRepository.findById(id);

        if (optionalProject.isEmpty()) {
            throw new NotFoundException("Project not found");
        }

        Project result = projectMapper.update(optionalProject.get(), toSave);

        return projectRepository.save(result);
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
