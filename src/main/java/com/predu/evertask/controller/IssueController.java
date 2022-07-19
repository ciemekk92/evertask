package com.predu.evertask.controller;

import com.predu.evertask.annotation.IsAllowedToIssue;
import com.predu.evertask.config.security.CurrentUserId;
import com.predu.evertask.domain.dto.issue.*;
import com.predu.evertask.domain.model.User;
import com.predu.evertask.service.IssueService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@Controller
@RequestMapping("api/issues")
public class IssueController {

    private final IssueService issueService;

    @GetMapping
    public ResponseEntity<List<IssueDto>> getAllIssues() {
        return ResponseEntity.ok(issueService.findAll());
    }

    @IsAllowedToIssue
    @GetMapping("/{id}")
    public ResponseEntity<IssueFullDto> getIssue(@PathVariable UUID id) {
        return issueService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/assigned_to_me")
    public ResponseEntity<List<IssueDto>> getAssignedIssuesToUser(@CurrentUserId UUID userId) {

        return ResponseEntity.ok(issueService.findAllByAssigneeId(userId));
    }

    @PostMapping
    public ResponseEntity<IssueSaveDto> createIssue(@RequestBody @Valid IssueSaveDto toCreate, Authentication authentication)
            throws URISyntaxException {

        User reporter = (User) authentication.getPrincipal();

        IssueSaveDto created = issueService.create(toCreate, reporter);

        return ResponseEntity.created(new URI("http://localhost:8080/api/issues/" + created.getId())).body(created);
    }

    @GetMapping("/{id}/time_tracking")
    public ResponseEntity<IssueTimeTrackingDto> getIssueTimeTrackingDetails(@PathVariable UUID id) {

        return ResponseEntity.ok(issueService.getIssueTimeTrackingDetails(id));
    }

    @PostMapping("/log_work")
    public ResponseEntity<Void> logWorkOnIssue(@RequestBody @Valid IssueReportTimeDto dto) {

        issueService.reportTimeOnIssue(dto);

        return ResponseEntity.ok().build();
    }

    @IsAllowedToIssue
    @PutMapping("/{id}/move_issue")
    public ResponseEntity<Void> moveIssue(@RequestBody @Valid MoveIssueDto dto,
                                          @PathVariable UUID id) {

        UUID targetSprintId = null;

        if (dto.getTargetSprintId() != null) {
            targetSprintId = UUID.fromString(dto.getTargetSprintId());
        }

        issueService.moveIssue(id, targetSprintId);

        return ResponseEntity.noContent().build();
    }

    @IsAllowedToIssue
    @PutMapping("/{id}")
    public ResponseEntity<Void> updateIssue(@RequestBody @Valid IssueUpdateDto toUpdate, @PathVariable UUID id) {
        if (!issueService.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        issueService.findById(id)
                .ifPresent(issue -> issueService.update(id, toUpdate));

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
