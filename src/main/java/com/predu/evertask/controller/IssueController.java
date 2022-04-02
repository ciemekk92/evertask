package com.predu.evertask.controller;

import com.predu.evertask.domain.dto.issue.IssueDto;
import com.predu.evertask.domain.dto.issue.IssueUpdateDto;
import com.predu.evertask.domain.model.Issue;
import com.predu.evertask.domain.model.User;
import com.predu.evertask.service.IssueService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.UUID;

@Controller
@RequestMapping("api/issues")
public class IssueController {

    private final IssueService issueService;

    public IssueController(IssueService issueService) {
        this.issueService = issueService;
    }

    @GetMapping
    public ResponseEntity<List<IssueDto>> getAllIssues() {
        return ResponseEntity.ok(issueService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Issue> getIssue(@PathVariable UUID id) {
        return issueService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/assigned_to_me")
    public ResponseEntity<List<IssueDto>> getAssignedIssuesToUser(Authentication authentication) throws IllegalAccessException {
        if (authentication == null) {
            throw new IllegalAccessException("No user logged in.");
        }

        User user = (User) authentication.getPrincipal();

        return ResponseEntity.ok(issueService.findByAssigneeId(user.getId()));
    }

    @PostMapping
    public ResponseEntity<IssueDto> createIssue(@RequestBody @Valid IssueDto toCreate) throws URISyntaxException {
        IssueDto created = issueService.create(toCreate);

        return ResponseEntity.created(new URI("http://localhost:8080/api/issues/" + created.getId())).body(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateIssue(@RequestBody @Valid IssueUpdateDto toUpdate, @PathVariable UUID id) {
        if (!issueService.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        issueService.findById(id).ifPresent(issue -> issueService.update(toUpdate));

        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteIssue(@PathVariable UUID id) {
        if (!issueService.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        issueService.deleteById(id);

        return ResponseEntity.noContent().build();
    }
}
