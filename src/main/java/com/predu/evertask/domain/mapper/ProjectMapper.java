package com.predu.evertask.domain.mapper;

import com.predu.evertask.domain.dto.project.ProjectCreateDto;
import com.predu.evertask.domain.dto.project.ProjectDto;
import com.predu.evertask.domain.dto.project.ProjectUpdateDto;
import com.predu.evertask.domain.model.Issue;
import com.predu.evertask.domain.model.Project;
import com.predu.evertask.repository.IssueRepository;
import org.mapstruct.*;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.OffsetDateTime;
import java.util.Optional;

@Mapper(uses = UUIDMapper.class, componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public abstract class ProjectMapper {

    @Autowired
    private IssueRepository issueRepository;

    @Autowired
    private SprintMapper sprintMapper;

    @Mapping(target = "issues", ignore = true)
    @Mapping(target = "organisation", ignore = true)
    @Mapping(target = "activeSprint", ignore = true)
    public abstract Project projectCreateDtoToProject(ProjectCreateDto projectCreateDto);

    public abstract Project update(@MappingTarget Project project, ProjectUpdateDto projectUpdateDto);

    @InheritInverseConfiguration(name = "projectCreateDtoToProject")
    public abstract ProjectCreateDto projectToProjectCreateDto(Project project);

    @Mapping(target = "lastUpdatedAt", ignore = true)
    @Mapping(target = "organisationId", source = "organisation.id")
    public abstract ProjectDto projectToProjectDto(Project project);

    @AfterMapping
    protected void afterProjectToProjectDto(Project project, @MappingTarget ProjectDto dto) {
        Optional<Issue> topByOrderByUpdatedAtDesc = issueRepository.findTopByProjectIdOrderByUpdatedAtDesc(project.getId());
        Optional<Issue> topByOrderByCreatedAtDesc = issueRepository.findTopByProjectIdOrderByCreatedAtDesc(project.getId());

        if (topByOrderByUpdatedAtDesc.isEmpty() || topByOrderByCreatedAtDesc.isEmpty()) {
            dto.setLastUpdatedAt(project.getUpdatedAt());
        } else {
            OffsetDateTime lastUpdatedIssueDate = topByOrderByUpdatedAtDesc.get().getUpdatedAt();
            OffsetDateTime lastCreatedIssueDate = topByOrderByCreatedAtDesc.get().getCreatedAt();

            if (lastUpdatedIssueDate != null) {
                if (lastUpdatedIssueDate.isAfter(lastCreatedIssueDate)) {
                    dto.setLastUpdatedAt(lastUpdatedIssueDate);
                }
            } else if (project.getUpdatedAt() != null) {
                if (lastCreatedIssueDate.isAfter(project.getUpdatedAt())) {
                    dto.setLastUpdatedAt(lastCreatedIssueDate);
                } else {
                    dto.setLastUpdatedAt(project.getUpdatedAt());
                }
            } else {
                dto.setLastUpdatedAt(lastCreatedIssueDate);
            }
        }

        if (project.getActiveSprint() != null) {
            dto.setActiveSprint(sprintMapper.sprintToSprintDto(project.getActiveSprint()));
        }
    }
}
