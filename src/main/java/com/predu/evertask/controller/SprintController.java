package com.predu.evertask.controller;

import com.predu.evertask.domain.dto.SprintSaveDto;
import com.predu.evertask.domain.mapper.SprintMapper;
import com.predu.evertask.domain.model.Sprint;
import com.predu.evertask.service.SprintService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.UUID;

@Controller
@RequestMapping("api/sprints")
public class SprintController {

    private final SprintService sprintService;
    private final SprintMapper sprintMapper;

    public SprintController(SprintService sprintService, SprintMapper sprintMapper) {
        this.sprintService = sprintService;
        this.sprintMapper = sprintMapper;
    }

    @GetMapping
    public ResponseEntity<List<Sprint>> getAllSprints() {
        return ResponseEntity.ok(sprintService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Sprint> getSprint(@PathVariable UUID id) {
        return sprintService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Sprint> createSprint(@RequestBody @Valid SprintSaveDto toCreate) throws URISyntaxException {
        Sprint created = sprintService.save(sprintMapper.sprintSaveDtoToSprint(toCreate));

        return ResponseEntity.created(new URI("http://localhost:8080/api/sprints/" + created.getId())).body(created);
    }
}
