package com.predu.evertask.service;

import com.predu.evertask.domain.dto.project.ProjectCreateDto;
import com.predu.evertask.domain.dto.project.ProjectDto;
import com.predu.evertask.domain.dto.project.ProjectUpdateDto;
import com.predu.evertask.domain.mapper.ProjectMapper;
import com.predu.evertask.domain.model.Project;
import com.predu.evertask.exception.NotFoundException;
import com.predu.evertask.repository.ProjectRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final ProjectMapper projectMapper;

    public ProjectService(ProjectRepository projectRepository, ProjectMapper projectMapper) {
        this.projectRepository = projectRepository;
        this.projectMapper = projectMapper;
    }

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

    public List<ProjectDto> findByOwnerId(UUID id) {
        return projectRepository.findByOwnerId(id)
                .stream()
                .map(projectMapper::projectToProjectDto)
                .collect(Collectors.toList());
    }

    public Project create(ProjectCreateDto toSave) {
        return projectRepository.save(projectMapper.projectCreateDtoToProject(toSave));
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
