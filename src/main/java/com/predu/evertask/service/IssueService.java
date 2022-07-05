package com.predu.evertask.service;

import com.predu.evertask.domain.dto.issue.IssueDto;
import com.predu.evertask.domain.dto.issue.IssueUpdateDto;
import com.predu.evertask.domain.enums.ProjectMethodology;
import com.predu.evertask.domain.mapper.IssueMapper;
import com.predu.evertask.domain.model.Issue;
import com.predu.evertask.domain.model.Project;
import com.predu.evertask.domain.model.Sprint;
import com.predu.evertask.domain.model.User;
import com.predu.evertask.exception.NotFoundException;
import com.predu.evertask.repository.IssueRepository;
import com.predu.evertask.repository.ProjectRepository;
import com.predu.evertask.repository.SprintRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

@RequiredArgsConstructor
@Service
public class IssueService {

    private final IssueRepository issueRepository;
    private final SprintRepository sprintRepository;
    private final ProjectRepository projectRepository;
    private final IssueMapper issueMapper;

    public List<IssueDto> findAll() {
        return issueRepository.findAll()
                .stream()
                .map(issueMapper::issueToIssueDto)
                .toList();
    }

    public List<IssueDto> findProjectsCurrentIssues(UUID projectId) {
        Optional<Project> optionalProject = projectRepository.findById(projectId);

        if (optionalProject.isEmpty()) {
            throw new NotFoundException(Project.class, projectId);
        }

        Project project = optionalProject.get();
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

    public List<IssueDto> findProjectLastIssues(UUID projectId) {
        return issueRepository.findTop10ByProjectIdOrderByCreatedAtDesc(projectId)
                .stream()
                .map(issueMapper::issueToIssueDto)
                .toList();
    }

    public List<IssueDto> findAllBySprintId(UUID sprintId) {
        return issueRepository.findAllBySprintId(sprintId)
                .stream()
                .map(issueMapper::issueToIssueDto)
                .toList();
    }

    public List<IssueDto> findAllUnassignedByProjectId(UUID projectId) {
        return issueRepository.findAllByProjectIdAndSprintIsNull(projectId)
                .stream()
                .sorted(Comparator.comparingInt(Issue::getKey))
                .map(issueMapper::issueToIssueDto)
                .toList();
    }

    public Optional<IssueDto> findById(UUID id) {
        Optional<Issue> issue = issueRepository.findById(id);

        return issue.map(issueMapper::issueToIssueDto);
    }

    public List<IssueDto> findAllByAssigneeId(UUID id) {
        return issueRepository.findAllByAssigneeId(id)
                .stream()
                .map(issueMapper::issueToIssueDto)
                .toList();
    }

    public IssueDto create(IssueDto toSave, User reporter) {
        Issue issue = issueMapper.issueDtoToIssue(toSave);
        issue.setReporter(reporter);

        issueRepository.save(issue);

        return toSave;
    }

    public Issue update(UUID id, IssueUpdateDto toUpdate) {
        Optional<Issue> optionalIssue = issueRepository.findById(id);

        if (optionalIssue.isEmpty()) {
            throw new NotFoundException(Issue.class, id);
        }

        Issue result = issueMapper.update(optionalIssue.get(), toUpdate);

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

        return map;
    }

    public boolean existsById(UUID id) {
        return issueRepository.existsById(id);
    }

    public void moveIssue(UUID issueId, UUID targetSprintId) {

        Issue issue = issueRepository.findById(issueId)
                .orElseThrow(() -> new NotFoundException(Issue.class, issueId));

        Sprint sprint = null;

        if (targetSprintId != null) {
            sprint = sprintRepository.findById(targetSprintId).orElse(null);
        }

        issue.setSprint(sprint);
        issueRepository.save(issue);
    }

    public void delete(Issue toDelete) {
        issueRepository.delete(toDelete);
    }

    public void deleteById(UUID id) {
        issueRepository.deleteById(id);
    }
}
