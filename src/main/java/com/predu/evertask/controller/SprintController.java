package com.predu.evertask.controller;

import com.predu.evertask.domain.dto.auth.UserDto;
import com.predu.evertask.domain.dto.issue.IssueDto;
import com.predu.evertask.domain.dto.sprint.SprintDto;
import com.predu.evertask.domain.dto.sprint.SprintSaveDto;
import com.predu.evertask.domain.model.Sprint;
import com.predu.evertask.service.IssueService;
import com.predu.evertask.service.SprintService;
import com.predu.evertask.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@Controller
@RequestMapping("api/sprints")
public class SprintController {

    private final SprintService sprintService;
    private final IssueService issueService;
    private final UserService userService;

    @GetMapping
    public ResponseEntity<List<SprintDto>> getAllSprints() {
        return ResponseEntity.ok(sprintService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<SprintDto> getSprint(@PathVariable UUID id) {
        return sprintService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/{id}/issues")
    public ResponseEntity<List<IssueDto>> getSprintIssues(@PathVariable UUID id) {
        return ResponseEntity.ok(issueService.findAllBySprintId(id));
    }

    @GetMapping("/{id}/active_members")
    public ResponseEntity<List<UserDto>> getSprintActiveMembers(@PathVariable UUID id) {
        return ResponseEntity.ok(userService.getSprintActiveMembers(id));
    }

    @PostMapping
    public ResponseEntity<SprintSaveDto> createSprint(@RequestBody @Valid SprintSaveDto toCreate) throws URISyntaxException {
        Sprint created = sprintService.save(toCreate);

        return ResponseEntity.created(new URI("http://localhost:8080/api/sprints/" + created.getId())).body(toCreate);
    }
}
