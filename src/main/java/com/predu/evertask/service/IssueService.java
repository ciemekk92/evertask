package com.predu.evertask.service;

import com.predu.evertask.domain.dto.issue.IssueDto;
import com.predu.evertask.domain.dto.issue.IssueUpdateDto;
import com.predu.evertask.domain.mapper.IssueMapper;
import com.predu.evertask.domain.model.Issue;
import com.predu.evertask.repository.IssueRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

@RequiredArgsConstructor
@Service
public class IssueService {

    private final IssueRepository issueRepository;
    private final IssueMapper issueMapper;

    public List<IssueDto> findAll() {
        return issueRepository.findAll()
                .stream()
                .map(issueMapper::issueToIssueDto)
                .toList();
    }

    public List<IssueDto> findAllByProjectId(UUID projectId) {
        return issueRepository.findAllByProjectId(projectId)
                .stream()
                .map(issueMapper::issueToIssueDto)
                .toList();
    }

    public List<IssueDto> getProjectLastIssues(UUID projectId) {
        return issueRepository.findTop10ByProjectIdOrderByCreatedAtDesc(projectId)
                .stream()
                .map(issueMapper::issueToIssueDto)
                .toList();
    }

    public Optional<Issue> findById(UUID id) {
        return issueRepository.findById(id);
    }

    public List<IssueDto> findAllByAssigneeId(UUID id) {
        return issueRepository.findAllByAssigneeId(id)
                .stream()
                .map(issueMapper::issueToIssueDto)
                .toList();
    }

    public IssueDto create(IssueDto toSave) {
        issueRepository.save(issueMapper.issueDtoToIssue(toSave));

        return toSave;
    }

    public Issue update(IssueUpdateDto toUpdate) {
        return issueRepository.save(issueMapper.issueUpdateDtoToIssue(toUpdate));
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

    public void delete(Issue toDelete) {
        issueRepository.delete(toDelete);
    }

    public void deleteById(UUID id) {
        issueRepository.deleteById(id);
    }
}
