package com.predu.evertask.domain.mapper;

import com.predu.evertask.annotation.IncludeBeforeMapping;
import com.predu.evertask.domain.dto.issue.IssueDto;
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

@Mapper(uses = UUIDMapper.class, componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public abstract class IssueMapper {

    @Autowired
    protected IssueRepository issueRepository;

    @Autowired
    private SprintRepository sprintRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private UUIDMapper uuidMapper;

    @PersistenceContext
    EntityManager entityManager;

    @Mapping(target = "parentIssue", ignore = true)
    @Mapping(source = "assigneeId", target = "assignee.id")
    @Mapping(source = "sprintId", target = "sprint.id")
    @Mapping(source = "projectId", target = "project.id")
    public abstract Issue issueDtoToIssue(IssueDto issueDto);

    @InheritInverseConfiguration(name = "issueDtoToIssue")
    public abstract IssueDto issueToIssueDto(Issue issue);

    @Mapping(source = "sprintId", target = "sprint.id")
    public abstract Issue update(@MappingTarget Issue issue, IssueUpdateDto issueUpdateDto);

    @AfterMapping
    public void afterIssueSaveDtoToIssue(IssueDto issueDto, @MappingTarget Issue issue) {
        if (!issueDto.getSubtasks().isEmpty()) {
            issueDto.setSubtasks(
                    issue.getSubtasks()
                            .stream()
                            .map(this::issueToIssueDto)
                            .collect(Collectors.toSet())
            );
        }

        if (issueDto.getSprintId() == null) {
            issue.setSprint(null);
        }

        if (issueDto.getParentId() != null) {
            issue.setParentIssue(issueRepository.findById(uuidMapper.stringToUUID(issueDto.getParentId())).orElse(null));
        }

        if (issueDto.getAssigneeId() != null) {
            issue.setAssignee(userRepository
                    .findById(uuidMapper.stringToUUID(issueDto.getAssigneeId()))
                    .orElse(null));
        } else {
            issue.setAssignee(null);
        }
    }

    @IncludeBeforeMapping
    @BeforeMapping
    void beforeFlushIssue(@MappingTarget IssueDto issueDto, Issue issue) {
        entityManager.flush();
    }
}
