package com.predu.evertask.controller;

import com.predu.evertask.annotation.IsNotUnassignedUser;
import com.predu.evertask.annotation.IsOrganisationAdminOrAdmin;
import com.predu.evertask.annotation.IsCurrentProjectAdminOrAdmin;
import com.predu.evertask.annotation.IsProjectMember;
import com.predu.evertask.domain.dto.issue.IssueDto;
import com.predu.evertask.domain.dto.issue.IssueFullDto;
import com.predu.evertask.domain.dto.issue.IssuesPaginationDto;
import com.predu.evertask.domain.dto.user.UserDto;
import com.predu.evertask.domain.dto.project.ProjectCreateDto;
import com.predu.evertask.domain.dto.project.ProjectDto;
import com.predu.evertask.domain.dto.project.ProjectUpdateDto;
import com.predu.evertask.domain.dto.sprint.EndSprintDto;
import com.predu.evertask.domain.dto.sprint.SprintDto;
import com.predu.evertask.domain.dto.sprint.SprintIssuesDto;
import com.predu.evertask.domain.dto.sprint.StartSprintDto;
import com.predu.evertask.domain.model.Project;
import com.predu.evertask.domain.model.User;
import com.predu.evertask.exception.InvalidOperationException;
import com.predu.evertask.service.IssueService;
import com.predu.evertask.service.ProjectService;
import com.predu.evertask.service.SprintService;
import com.predu.evertask.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RequiredArgsConstructor
@Controller
@RequestMapping("api/projects")
public class ProjectController {

    private final ProjectService projectService;
    private final IssueService issueService;
    private final SprintService sprintService;
    private final UserService userService;


    @IsCurrentProjectAdminOrAdmin
    @GetMapping
    public ResponseEntity<List<ProjectDto>> getAllProjects() {
        return ResponseEntity.ok(projectService.findAll());
    }

    @IsProjectMember
    @GetMapping("/{id}")
    public ResponseEntity<ProjectDto> getProject(@PathVariable UUID id) {
        return projectService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @IsNotUnassignedUser
    @GetMapping("/organisation")
    public ResponseEntity<List<ProjectDto>> getUserOrganisationProjects(Authentication authentication) {

        User user = (User) authentication.getPrincipal();

        return ResponseEntity.ok(projectService
                .findAllByOrganisation(user.getOrganisation().getId()));
    }

    @IsProjectMember
    @GetMapping("/{id}/active_members")
    public ResponseEntity<List<UserDto>> getProjectActiveMembers(@PathVariable UUID id) {

        return ResponseEntity.ok(userService.getProjectActiveMembers(id));
    }

    @IsProjectMember
    @GetMapping("/{id}/sprints")
    public ResponseEntity<List<SprintDto>> getProjectSprints(@PathVariable UUID id) {

        return ResponseEntity.ok(sprintService.getProjectSprints(id));
    }

    @IsProjectMember
    @GetMapping("/{id}/sprints_not_completed")
    public ResponseEntity<List<SprintIssuesDto>> getProjectsNotCompletedSprints(@PathVariable UUID id,
                                                                                @RequestParam(defaultValue = "") String query) {

        return ResponseEntity.ok(sprintService.getProjectsNotCompletedSprints(id, query));
    }

    @IsProjectMember
    @GetMapping("/{id}/sprints_completed")
    public ResponseEntity<List<SprintIssuesDto>> getProjectsCompletedSprints(@PathVariable UUID id) {

        return ResponseEntity.ok(sprintService.getProjectsCompletedSprints(id));
    }

    @IsProjectMember
    @GetMapping("/{id}/last_issues")
    public ResponseEntity<List<IssueFullDto>> getProjectLastIssues(@PathVariable UUID id) {

        return ResponseEntity.ok(issueService.findProjectLastIssues(id));
    }

    @IsProjectMember
    @GetMapping("/{id}/current_issues")
    public ResponseEntity<Map<String, List<IssueDto>>> getProjectCurrentIssues(@PathVariable UUID id) {
        var issues = issueService.mapIssuesByStatus(issueService.findProjectsCurrentIssues(id));

        return ResponseEntity.ok(issues);
    }

    @IsProjectMember
    @GetMapping("/{id}/unassigned_issues")
    public ResponseEntity<IssuesPaginationDto> getIssuesUnassignedToSprint(@PathVariable UUID id,
                                                                           @RequestParam(defaultValue = "") String query,
                                                                           @RequestParam(defaultValue = "0") int page,
                                                                           @RequestParam(defaultValue = "10") int size) {

        Pageable paging = PageRequest.of(page, size);

        return ResponseEntity.ok(issueService.findAllUnassignedByProjectId(id, query, paging));
    }

    @IsCurrentProjectAdminOrAdmin
    @PutMapping("/{id}/start_sprint")
    public ResponseEntity<Void> startSprint(@PathVariable UUID id,
                                            @RequestBody @Valid StartSprintDto dto) {
        projectService.startSprint(id, dto);

        return ResponseEntity.noContent().build();
    }

    @IsCurrentProjectAdminOrAdmin
    @PutMapping("/{id}/end_sprint")
    public ResponseEntity<Void> endSprint(@PathVariable UUID id,
                                          @RequestBody @Valid EndSprintDto dto) throws InvalidOperationException {
        projectService.endSprint(id, dto);

        return ResponseEntity.noContent().build();
    }

    @IsOrganisationAdminOrAdmin
    @PostMapping
    public ResponseEntity<ProjectCreateDto> createProject(@RequestBody @Valid ProjectCreateDto toCreate,
                                                          Authentication authentication) throws URISyntaxException {

        User owner = (User) authentication.getPrincipal();

        Project created = projectService.create(toCreate, owner);

        return ResponseEntity
                .created(new URI("http://localhost:8080/api/projects/" + created.getId()))
                .body(toCreate);
    }

    @IsCurrentProjectAdminOrAdmin
    @PutMapping("/{id}")
    public ResponseEntity<Void> updateProject(@RequestBody @Valid ProjectUpdateDto toUpdate,
                                              @PathVariable UUID id) {
        if (!projectService.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        projectService.findById(id).ifPresent(project -> projectService.update(id, toUpdate));

        return ResponseEntity.noContent().build();
    }

    @IsCurrentProjectAdminOrAdmin
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProject(@PathVariable UUID id) {
        if (!projectService.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        projectService.deleteById(id);

        return ResponseEntity.noContent().build();
    }
}
