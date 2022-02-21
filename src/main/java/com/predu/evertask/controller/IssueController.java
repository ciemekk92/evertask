package com.predu.evertask.controller;

import com.predu.evertask.domain.dto.IssueSaveDto;
import com.predu.evertask.domain.dto.IssueUpdateDto;
import com.predu.evertask.domain.mapper.IssueMapper;
import com.predu.evertask.domain.model.Issue;
import com.predu.evertask.service.IssueService;
import org.springframework.http.ResponseEntity;
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
    private final IssueMapper issueMapper;

    public IssueController(IssueService issueService, IssueMapper issueMapper) {
        this.issueService = issueService;
        this.issueMapper = issueMapper;
    }

    @GetMapping
    public ResponseEntity<List<Issue>> getAllIssues() {
        return ResponseEntity.ok(issueService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Issue> getIssue(@PathVariable UUID id) {
        return issueService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Issue> createIssue(@RequestBody @Valid IssueSaveDto toCreate) throws URISyntaxException {
        Issue created = issueService.save(issueMapper.issueSaveDtoToIssue(toCreate));

        return ResponseEntity.created(new URI("http://localhost:8080/api/issues/" + created.getId())).body(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateIssue(@RequestBody @Valid IssueUpdateDto toUpdate, @PathVariable UUID id) {
        if (!issueService.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        issueService.findById(id).ifPresent(issue -> {
            var result = issueMapper.issueUpdateDtoToIssue(toUpdate, issue);

            issueService.save(result);
        });

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
