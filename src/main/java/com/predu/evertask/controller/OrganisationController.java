package com.predu.evertask.controller;

import com.predu.evertask.domain.dto.organisation.OrganisationCreateDto;
import com.predu.evertask.domain.dto.organisation.OrganisationDto;
import com.predu.evertask.domain.mapper.OrganisationMapper;
import com.predu.evertask.domain.model.Organisation;
import com.predu.evertask.service.OrganisationService;
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
@RequestMapping("api/organisations")
public class OrganisationController {

    private final OrganisationService organisationService;
    private final OrganisationMapper organisationMapper;

    @GetMapping
    public ResponseEntity<List<OrganisationDto>> getAllOrganisations() {
        return ResponseEntity.ok(organisationService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrganisationDto> getOrganisation(@PathVariable UUID id) {
        return organisationService.findById(id)
                .map(organisationMapper::organisationToOrganisationDto)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<OrganisationCreateDto> createOrganisation(@RequestBody @Valid OrganisationCreateDto toCreate) throws URISyntaxException {
        Organisation created = organisationService.create(toCreate);

        return ResponseEntity
                .created(new URI("http://localhost:8080/api/organisations/" + created.getId()))
                .body(toCreate);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateOrganisation(@RequestBody @Valid OrganisationDto toUpdate, @PathVariable UUID id) {
        if (!organisationService.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        organisationService.findById(id).ifPresent(org -> organisationService.update(id, toUpdate));

        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrganisation(@PathVariable UUID id) {
        if (!organisationService.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        organisationService.deleteById(id);

        return ResponseEntity.noContent().build();
    }
}
