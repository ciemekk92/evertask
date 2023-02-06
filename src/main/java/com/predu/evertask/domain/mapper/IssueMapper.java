package com.predu.evertask.domain.mapper;

import com.predu.evertask.annotation.IncludeBeforeMapping;
import com.predu.evertask.domain.dto.issue.*;
import com.predu.evertask.domain.history.IssueHistory;
import com.predu.evertask.domain.model.Issue;
import com.predu.evertask.domain.model.Project;
import com.predu.evertask.domain.model.Sprint;
import com.predu.evertask.exception.NotFoundException;
import com.predu.evertask.repository.IssueRepository;
import com.predu.evertask.repository.ProjectRepository;
import com.predu.evertask.repository.SprintRepository;
import com.predu.evertask.repository.UserRepository;
import com.predu.evertask.util.HtmlSanitizer;
import org.mapstruct.*;
import org.springframework.beans.factory.annotation.Autowired;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.UUID;

@Mapper(uses = {UUIDMapper.class, ImageMapper.class, RevisionTypeMapper.class},
        componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public abstract class IssueMapper {

    @Autowired
    private IssueRepository issueRepository;

    @Autowired
    private SprintRepository sprintRepository;

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserViewMapper userViewMapper;

    @Autowired
    private IssueCommentMapper issueCommentMapper;

    @Autowired
    private UUIDMapper uuidMapper;

    @PersistenceContext
    EntityManager entityManager;

    @Mapping(target = "parentIssue", ignore = true)
    @Mapping(target = "description", ignore = true)
    @Mapping(target = "assignee.id", ignore = true)
    @Mapping(target = "sprint.id", ignore = true)
    @Mapping(target = "project.id", ignore = true)
    public abstract Issue issueSaveDtoToIssue(IssueSaveDto issueSaveDto);

    @InheritInverseConfiguration(name = "issueSaveDtoToIssue")
    public abstract IssueSaveDto issueToIssueSaveDto(Issue issue);

    public abstract IssueHistoryDto issueHistoryToIssueHistoryDto(IssueHistory issueHistory);

    @Mapping(source = "project.id", target = "projectId")
    @Mapping(source = "sprint.id", target = "sprintId")
    @Mapping(source = "parentIssue.id", target = "parentId")
    @Mapping(target = "assignee", ignore = true)
    public abstract IssueDto issueToIssueDto(Issue issue);

    public abstract IssueFullDto issueToIssueFullDto(Issue issue);

    public abstract IssueLastDto issueToIssueLastDto(Issue issue);

    @Mapping(target = "description", ignore = true)
    @Mapping(source = "sprintId", target = "sprint.id")
    public abstract Issue update(@MappingTarget Issue issue, IssueUpdateDto issueUpdateDto);

    @AfterMapping
    public void afterIssueSaveDtoToIssue(IssueSaveDto issueSaveDto, @MappingTarget Issue issue) {

        if (!issueSaveDto.getSubtasks().isEmpty()) {
            issueSaveDto.setSubtasks(
                    issue.getSubtasks()
                            .stream()
                            .map(this::issueToIssueSaveDto)
                            .toList()
            );
        }

        if (issueSaveDto.getDescription() != null) {
            issue.setDescription(HtmlSanitizer.sanitize(issueSaveDto.getDescription()));
        }

        if (issueSaveDto.getSprintId() == null) {
            issue.setSprint(null);
        } else {
            Sprint sprint = sprintRepository
                    .findById(UUID.fromString(issueSaveDto.getSprintId()))
                    .orElseThrow(() -> new NotFoundException(Sprint.class, issueSaveDto.getSprintId()));

            issue.setSprint(sprint);
        }

        if (issueSaveDto.getParentId() != null) {
            issue.setParentIssue(issueRepository
                    .findById(uuidMapper.stringToUUID(issueSaveDto.getParentId()))
                    .orElse(null));
        }

        if (issueSaveDto.getAssigneeId() != null) {
            issue.setAssignee(userRepository
                    .findById(uuidMapper.stringToUUID(issueSaveDto.getAssigneeId()))
                    .orElse(null));
        } else {
            issue.setAssignee(null);
        }

        if (issueSaveDto.getProjectId() != null) {
            issue.setProject(projectRepository
                    .findById(uuidMapper.stringToUUID(issueSaveDto.getProjectId()))
                    .orElseThrow(() -> new NotFoundException(Project.class, issueSaveDto.getProjectId())));
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

        if (source.getDescription() != null) {
            target.setDescription(HtmlSanitizer.sanitize(source.getDescription()));
        }

        if (source.getSprintId() == null) {
            target.setSprint(null);
        }

        if (source.getAssigneeId() != null) {
            target.setAssignee(userRepository
                    .findById(uuidMapper.stringToUUID(source.getAssigneeId()))
                    .orElse(null));
        }
    }

    @IncludeBeforeMapping
    @BeforeMapping
    void beforeFlushIssue(@MappingTarget IssueSaveDto issueSaveDto, Issue issue) {
        entityManager.flush();
    }
}
