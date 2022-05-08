package com.predu.evertask.domain.mapper;

import com.predu.evertask.domain.dto.project.ProjectCreateDto;
import com.predu.evertask.domain.dto.project.ProjectDto;
import com.predu.evertask.domain.dto.project.ProjectUpdateDto;
import com.predu.evertask.domain.model.Issue;
import com.predu.evertask.domain.model.Project;
import com.predu.evertask.repository.IssueRepository;
import org.mapstruct.*;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Date;

@Mapper(uses = UUIDMapper.class, componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public abstract class ProjectMapper {

    @Autowired
    private IssueRepository issueRepository;

    @Mapping(target = "issues", ignore = true)
    @Mapping(target = "organisation", ignore = true)
    public abstract Project projectCreateDtoToProject(ProjectCreateDto projectCreateDto);

    public abstract Project update(@MappingTarget Project project, ProjectUpdateDto projectUpdateDto);

    @InheritInverseConfiguration(name = "projectCreateDtoToProject")
    public abstract ProjectCreateDto projectToProjectCreateDto(Project project);

    @Mapping(target = "lastUpdatedAt", ignore = true)
    public abstract ProjectDto projectToProjectDto(Project project);

    @AfterMapping
    protected void afterProjectToProjectDto(Project project, @MappingTarget ProjectDto dto) {
        Issue issue = issueRepository.findTopByOrderByUpdatedAtDesc();
        if (issue == null) {
            dto.setLastUpdatedAt(project.getUpdatedAt());
        } else {
            Date lastUpdatedIssueDate = issue.getUpdatedAt();

            if (lastUpdatedIssueDate != null) {
                if (lastUpdatedIssueDate.after(project.getUpdatedAt())) {
                    dto.setLastUpdatedAt(lastUpdatedIssueDate);
                } else {
                    dto.setLastUpdatedAt(project.getUpdatedAt());
                }
            }
        }
    }
}
