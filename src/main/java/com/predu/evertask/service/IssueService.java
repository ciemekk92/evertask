package com.predu.evertask.service;

import com.predu.evertask.domain.dto.issue.*;
import com.predu.evertask.domain.enums.ProjectMethodology;
import com.predu.evertask.domain.mapper.IssueMapper;
import com.predu.evertask.domain.mapper.IssueWorkLogMapper;
import com.predu.evertask.domain.model.*;
import com.predu.evertask.exception.NotFoundException;
import com.predu.evertask.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@RequiredArgsConstructor
@Service
public class IssueService {

    private final IssueRepository issueRepository;
    private final IssueWorkLogRepository issueWorkLogRepository;
    private final SprintRepository sprintRepository;
    private final ProjectRepository projectRepository;
    private final IssueMapper issueMapper;
    private final IssueWorkLogMapper issueWorkLogMapper;
    private final UserRepository userRepository;

    public List<IssueDto> findAll() {
        return issueRepository.findAll()
                .stream()
                .map(issueMapper::issueToIssueDto)
                .toList();
    }

    public List<IssueDto> findProjectsCurrentIssues(UUID projectId) {

        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new NotFoundException(Project.class, projectId));
        List<Issue> issues;

        if (project.getMethodology() == ProjectMethodology.KANBAN) {
            issues = issueRepository.findAllByProjectId(projectId);
        } else if (project.getActiveSprint() != null) {
            issues = issueRepository.findAllBySprintId(project.getActiveSprint().getId());
        } else {
            issues = new ArrayList<>();
        }

        return issues.stream()
                .map(issueMapper::issueToIssueDto)
                .toList();
    }

    public List<IssueLastDto> findProjectLastIssues(UUID projectId) {
        return issueRepository.findTop10ByProjectIdOrderByCreatedAtDesc(projectId)
                .stream()
                .map(issueMapper::issueToIssueLastDto)
                .toList();
    }

    public List<IssueFullDto> findAllBySprintId(UUID sprintId) {
        return issueRepository.findAllBySprintIdAndIsNotSubtask(sprintId)
                .stream()
                .map(issueMapper::issueToIssueFullDto)
                .toList();
    }

    @Transactional
    public IssuesPaginationDto findAllUnassignedByProjectId(UUID projectId,
                                                            String query,
                                                            Pageable paging) {
        Page<Issue> pagedIssues = issueRepository.findAllByProjectIdAndSprintIsNullOrderByKeyDesc(projectId, query, paging);
        List<IssueDto> issues = pagedIssues
                .stream()
                .map(issueMapper::issueToIssueDto)
                .toList();

        return IssuesPaginationDto.builder()
                .currentPage(pagedIssues.getNumber())
                .totalItems(pagedIssues.getTotalElements())
                .totalPages(pagedIssues.getTotalPages())
                .issues(issues)
                .build();
    }

    public Optional<IssueDto> findById(UUID id) {
        Optional<Issue> issue = issueRepository.findById(id);

        return issue.map(issueMapper::issueToIssueDto);
    }

    public Optional<IssueFullDto> findFullIssueById(UUID id) {
        Optional<Issue> issue = issueRepository.findById(id);

        return issue.map(issueMapper::issueToIssueFullDto);
    }

    public List<IssueFullDto> findAllByAssigneeId(UUID id) {
        return issueRepository.findAllByAssigneeId(id)
                .stream()
                .map(issueMapper::issueToIssueFullDto)
                .toList();
    }

    public Issue create(IssueSaveDto toSave, UUID reporterId) {

        User reporter = userRepository.findById(reporterId)
                .orElseThrow(() -> new NotFoundException(User.class, reporterId));

        Issue issue = issueMapper.issueSaveDtoToIssue(toSave);
        issue.setReporter(reporter);

        return issueRepository.save(issue);
    }

    public void assignUserToIssue(UUID issueId, AssignUserToIssueDto dto) {

        Issue issue = issueRepository.findById(issueId)
                .orElseThrow(() -> new NotFoundException(Issue.class, issueId));
        User assignee;

        if (dto.getAssigneeId() != null) {
            UUID userId = UUID.fromString(dto.getAssigneeId());
            assignee = userRepository.findById(userId)
                    .orElseThrow(() -> new NotFoundException(User.class, userId));
        } else {
            assignee = null;
        }

        issue.setAssignee(assignee);
        issueRepository.save(issue);
    }

    public void reportTimeOnIssue(IssueReportTimeDto toSave) {
        IssueWorkLog workLog = issueWorkLogMapper.issueReportTimeDtoToIssueWorkLog(toSave);

        issueWorkLogRepository.save(workLog);
    }

    public IssueTimeTrackingDto getIssueTimeTrackingDetails(UUID issueId) {

        Issue issue = issueRepository.findById(issueId).orElseThrow(() -> new NotFoundException(Issue.class, issueId));

        int totalReported = issueWorkLogRepository
                .findAllByIssueId(issueId)
                .stream()
                .mapToInt(IssueWorkLog::getReportedHours).sum();

        int remainingHours = issue.getEstimateHours() != null ? issue.getEstimateHours() - totalReported : 0;

        return IssueTimeTrackingDto.builder()
                .totalReportedHours(totalReported)
                .estimatedHours(issue.getEstimateHours())
                .remainingHours(Math.max(remainingHours, 0))
                .build();
    }

    public Issue update(UUID id, IssueUpdateDto toUpdate) {
        Issue issue = issueRepository.findById(id)
                .orElseThrow(() -> new NotFoundException(Issue.class, id));

        Issue result = issueMapper.update(issue, toUpdate);

        return issueRepository.save(result);
    }

    public Map<String, List<IssueDto>> mapIssuesByStatus(List<IssueDto> issues) {
        Map<String, List<IssueDto>> map = new HashMap<>();

        issues.forEach(issue -> {
            var list = map.get(issue.getStatus());
            if (list == null) {
                list = new ArrayList<>();
            }

            list.add(issue);
            map.put(issue.getStatus(), list);
        });

        map.values().forEach(list -> list.sort(Comparator.comparingInt(IssueDto::getKey)));

        return map;
    }

    public boolean existsById(UUID id) {
        return issueRepository.existsById(id);
    }

    public void moveIssue(UUID issueId, MoveIssueDto dto) {

        UUID targetSprintId = null;

        if (dto.getTargetSprintId() != null) {
            targetSprintId = UUID.fromString(dto.getTargetSprintId());
        }

        Issue issue = issueRepository.findById(issueId)
                .orElseThrow(() -> new NotFoundException(Issue.class, issueId));

        Sprint sprint = null;

        if (targetSprintId != null) {
            sprint = sprintRepository.findById(targetSprintId)
                    .orElse(null);
        }

        Sprint finalSprint = sprint;

        issue.setSprint(finalSprint);
        issue.getSubtasks().forEach(subtask -> subtask.setSprint(finalSprint));
        issueRepository.save(issue);
    }

    public void delete(Issue toDelete) {
        issueRepository.delete(toDelete);
    }

    public void deleteById(UUID id) {
        issueRepository.deleteById(id);
    }
}
