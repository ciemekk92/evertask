package com.predu.evertask.controller;

import com.predu.evertask.annotation.IsAdmin;
import com.predu.evertask.annotation.IsProjectAdmin;
import com.predu.evertask.annotation.IsUserAllowedToSprint;
import com.predu.evertask.domain.dto.issue.IssueFullDto;
import com.predu.evertask.domain.dto.sprint.SprintDto;
import com.predu.evertask.domain.dto.sprint.SprintSaveDto;
import com.predu.evertask.domain.dto.sprint.SprintUpdateDto;
import com.predu.evertask.domain.dto.user.UserDto;
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

/**
 * SprintController class, responsible for receiving request of viewing, creating and managing sprint entities
 */
@RequiredArgsConstructor
@Controller
@RequestMapping("api/sprints")
public class SprintController {

    private final SprintService sprintService;
    private final IssueService issueService;
    private final UserService userService;

    /**
     * <p>Endpoint returning a list of all sprints in the database mapped to SprintDTOs</p>
     * @return list of all sprints
     */
    @IsAdmin
    @GetMapping
    public ResponseEntity<List<SprintDto>> getAllSprints() {
        return ResponseEntity.ok(sprintService.findAll());
    }

    /**
     * <p>Endpoint returning a sprint with a given id</p>
     * @param id id of searched sprint
     * @return found sprint mapped to DTO or 404 response
     */
    @IsUserAllowedToSprint
    @GetMapping("/{id}")
    public ResponseEntity<SprintDto> getSprint(@PathVariable UUID id) {
        return sprintService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * <p>Endpoint returning a list of issues assigned to a sprint with a given id</p>
     * @param id id of sprint
     * @return list of issues mapped to IssueDTOs
     */
    @IsUserAllowedToSprint
    @GetMapping("/{id}/issues")
    public ResponseEntity<List<IssueFullDto>> getSprintIssues(@PathVariable UUID id) {
        return ResponseEntity.ok(issueService.findAllBySprintId(id));
    }

    /**
     * <p>Endpoint returning a list of users that were active in sprint with a given id</p>
     * @param id id of sprint
     * @return list of users mapped to UserDTOs
     */
    @IsUserAllowedToSprint
    @GetMapping("/{id}/active_members")
    public ResponseEntity<List<UserDto>> getSprintActiveMembers(@PathVariable UUID id) {
        return ResponseEntity.ok(userService.getSprintActiveMembers(id));
    }

    /**
     * <p>Endpoint allowing the creation of a new sprint</p>
     * @param toCreate SprintSaveDto - body of request containing data required for creating a new sprint
     * @return body of request
     * @throws URISyntaxException in case of incorrect sprint id
     */

    @IsProjectAdmin
    @PostMapping
    public ResponseEntity<SprintSaveDto> createSprint(@RequestBody @Valid SprintSaveDto toCreate)
            throws URISyntaxException {
        Sprint created = sprintService.create(toCreate);

        return ResponseEntity.created(new URI("http://localhost:8080/api/sprints/" + created.getId())).body(toCreate);
    }

    /**
     * <p>Endpoint allowing updating of sprint with a given id</p>
     * @param toUpdate SprintUpdateDto - body of request, containing data required for creating a new sprint
     * @param id sprint id
     * @return Response with status 204 if updated or 404 if sprint was not found
     */
    @IsProjectAdmin
    @PutMapping("/{id}")
    public ResponseEntity<Void> updateSprint(@RequestBody @Valid SprintUpdateDto toUpdate,
                                             @PathVariable UUID id) {
        if (!sprintService.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        sprintService.findById(id).ifPresent(sprint -> sprintService.update(id, toUpdate));

        return ResponseEntity.noContent().build();
    }
}
