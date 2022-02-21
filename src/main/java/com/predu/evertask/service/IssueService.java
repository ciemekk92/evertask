package com.predu.evertask.service;

import com.predu.evertask.domain.dto.issue.IssueDto;
import com.predu.evertask.domain.dto.issue.IssueUpdateDto;
import com.predu.evertask.domain.mapper.IssueMapper;
import com.predu.evertask.domain.model.Issue;
import com.predu.evertask.repository.IssueRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class IssueService {

    private final IssueRepository issueRepository;
    private final IssueMapper issueMapper;

    public IssueService(IssueRepository issueRepository, IssueMapper issueMapper) {
        this.issueRepository = issueRepository;
        this.issueMapper = issueMapper;
    }

    public List<IssueDto> findAll() {
        return issueRepository.findAll()
                .stream()
                .map(issueMapper::issueToIssueDto)
                .collect(Collectors.toList());
    }

    public Optional<Issue> findById(UUID id) {
        return issueRepository.findById(id);
    }

    public IssueDto create(IssueDto toSave) {
        issueRepository.save(issueMapper.issueDtoToIssue(toSave));

        return toSave;
    }

    public Issue update(IssueUpdateDto toUpdate) {
        return issueRepository.save(issueMapper.issueUpdateDtoToIssue(toUpdate));
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
