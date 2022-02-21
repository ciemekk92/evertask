package com.predu.evertask.service;

import com.predu.evertask.domain.model.Issue;
import com.predu.evertask.repository.IssueRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class IssueService {

    private final IssueRepository issueRepository;

    public IssueService(IssueRepository issueRepository) {
        this.issueRepository = issueRepository;
    }

    public List<Issue> findAll() {
        return issueRepository.findAll();
    }

    public Optional<Issue> findById(UUID id) {
        return issueRepository.findById(id);
    }

    public Issue save(Issue toSave) {
        return issueRepository.save(toSave);
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
