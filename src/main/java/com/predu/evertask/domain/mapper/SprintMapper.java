package com.predu.evertask.domain.mapper;

import com.predu.evertask.domain.dto.sprint.SprintDto;
import com.predu.evertask.domain.dto.sprint.SprintIssuesDto;
import com.predu.evertask.domain.dto.sprint.SprintSaveDto;
import com.predu.evertask.domain.dto.sprint.SprintUpdateDto;
import com.predu.evertask.domain.enums.IssueType;
import com.predu.evertask.domain.model.Issue;
import com.predu.evertask.domain.model.Sprint;
import com.predu.evertask.repository.ProjectRepository;
import org.mapstruct.*;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Comparator;

@Mapper(uses = {UUIDMapper.class, ImageMapper.class}, componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public abstract class SprintMapper {

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private UUIDMapper uuidMapper;

    @Autowired
    private IssueMapper issueMapper;

    @Mapping(target = "issues", ignore = true)
    @Mapping(target = "ordinal", ignore = true)
    @Mapping(target = "project", ignore = true)
    public abstract Sprint sprintSaveDtoToSprint(SprintSaveDto sprintSaveDto);

    public abstract Sprint update(@MappingTarget Sprint sprint, SprintUpdateDto sprintUpdateDto);

    @Mapping(target = "projectId", ignore = true)
    public abstract SprintDto sprintToSprintDto(Sprint sprint);

    @Mapping(target = "projectId", ignore = true)
    public abstract SprintIssuesDto sprintToSprintIssuesDto(Sprint sprint);

    @AfterMapping
    public void afterSprintToSprintDto(Sprint sprint, @MappingTarget SprintDto sprintDto) {
        if (sprint.getProject() != null) {
            sprintDto.setProjectId(uuidMapper.uuidToString(sprint.getProject().getId()));
        }
    }

    @AfterMapping
    public void afterSprintToSprintIssuesDto(Sprint source, @MappingTarget SprintIssuesDto target) {
        if (source.getProject() != null) {
            target.setProjectId(uuidMapper.uuidToString(source.getProject().getId()));
        }

        target.setIssues(source.getIssues()
                .stream()
                .filter(issue -> !issue.getType().equals(IssueType.SUBTASK))
                .sorted(Comparator.comparingInt(Issue::getKey))
                .map(issueMapper::issueToIssueDto)
                .toList());
    }

    @AfterMapping
    public void afterSprintSaveDtoToSprint(SprintSaveDto sprintDto, @MappingTarget Sprint sprint) {
        if (sprintDto.getProjectId() != null) {
            sprint.setProject(projectRepository.getById(uuidMapper.stringToUUID(sprintDto.getProjectId())));
        }
    }
}
