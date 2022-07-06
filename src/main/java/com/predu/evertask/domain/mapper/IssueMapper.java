package com.predu.evertask.domain.mapper;

import com.predu.evertask.annotation.IncludeBeforeMapping;
import com.predu.evertask.domain.dto.issue.IssueDto;
import com.predu.evertask.domain.dto.issue.IssueSaveDto;
import com.predu.evertask.domain.dto.issue.IssueUpdateDto;
import com.predu.evertask.domain.model.Issue;
import com.predu.evertask.repository.IssueRepository;
import com.predu.evertask.repository.ProjectRepository;
import com.predu.evertask.repository.SprintRepository;
import com.predu.evertask.repository.UserRepository;
import org.mapstruct.*;
import org.springframework.beans.factory.annotation.Autowired;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.stream.Collectors;

@Mapper(uses = {UUIDMapper.class, ImageMapper.class},
        componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public abstract class IssueMapper {

    @Autowired
    protected IssueRepository issueRepository;

    @Autowired
    private SprintRepository sprintRepository;

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserViewMapper userViewMapper;

    @Autowired
    private UUIDMapper uuidMapper;

    @PersistenceContext
    EntityManager entityManager;

    @Mapping(target = "parentIssue", ignore = true)
    @Mapping(source = "assigneeId", target = "assignee.id")
    @Mapping(source = "sprintId", target = "sprint.id")
    @Mapping(source = "projectId", target = "project.id")
    public abstract Issue issueSaveDtoToIssue(IssueSaveDto issueSaveDto);

    @InheritInverseConfiguration(name = "issueSaveDtoToIssue")
    public abstract IssueSaveDto issueToIssueSaveDto(Issue issue);

    @Mapping(source = "project.id", target = "projectId")
    @Mapping(source = "sprint.id", target = "sprintId")
    @Mapping(target = "assignee", ignore = true)
    public abstract IssueDto issueToIssueDto(Issue issue);

    @Mapping(source = "sprintId", target = "sprint.id")
    public abstract Issue update(@MappingTarget Issue issue, IssueUpdateDto issueUpdateDto);

    @AfterMapping
    public void afterIssueSaveDtoToIssue(IssueSaveDto issueSaveDto, @MappingTarget Issue issue) {
        if (!issueSaveDto.getSubtasks().isEmpty()) {
            issueSaveDto.setSubtasks(
                    issue.getSubtasks()
                            .stream()
                            .map(this::issueToIssueSaveDto)
                            .collect(Collectors.toSet())
            );
        }

        if (issueSaveDto.getSprintId() == null) {
            issue.setSprint(null);
        }

        if (issueSaveDto.getParentId() != null) {
            issue.setParentIssue(issueRepository.findById(uuidMapper.stringToUUID(issueSaveDto.getParentId())).orElse(null));
        }

        if (issueSaveDto.getAssigneeId() != null) {
            issue.setAssignee(userRepository
                    .findById(uuidMapper.stringToUUID(issueSaveDto.getAssigneeId()))
                    .orElse(null));
        } else {
            issue.setAssignee(null);
        }
    }

    @AfterMapping
    public void afterIssueToIssueDto(Issue source, @MappingTarget IssueDto target) {
        if (source.getAssignee() != null) {
            target.setAssignee(userViewMapper.toUserIssueDto(source.getAssignee()));
        }

        if (source.getReporter() != null) {
            target.setReporter(userViewMapper.toUserIssueDto(source.getReporter()));
        }
    }

    @AfterMapping
    public void afterUpdate(IssueUpdateDto source, @MappingTarget Issue target) {
        if (source.getSprintId() == null) {
            target.setSprint(null);
        }
    }

    @IncludeBeforeMapping
    @BeforeMapping
    void beforeFlushIssue(@MappingTarget IssueSaveDto issueSaveDto, Issue issue) {
        entityManager.flush();
    }
}
