package com.predu.evertask.controller;

import com.predu.evertask.domain.dto.ProjectSaveDto;
import com.predu.evertask.domain.model.Project;
import com.predu.evertask.service.ProjectService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.UUID;

@Controller
@RequestMapping("api/projects")
public class ProjectController {

    private final ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @GetMapping
    public ResponseEntity<List<Project>> getAllProjects() {
        return ResponseEntity.ok(projectService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Project> getProject(@PathVariable UUID id) {
        return projectService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Project> createProject(@RequestBody @Valid ProjectSaveDto toCreate) throws URISyntaxException {
        Project created = projectService.save(toCreate.toProject());

        return ResponseEntity.created(new URI("http://localhost:8080/api/projects/" + created.getId())).body(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateProject(@RequestBody @Valid ProjectSaveDto toUpdate, @PathVariable UUID id) {
        if (!projectService.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        projectService.findById(id).ifPresent(project -> {
            project.updateFrom(toUpdate.toProject());
            projectService.save(project);
        });

        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProject(@PathVariable UUID id) {
        if (!projectService.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        projectService.deleteById(id);

        return ResponseEntity.noContent().build();
    }
}
