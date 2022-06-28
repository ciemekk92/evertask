package com.predu.evertask.repository;

import com.predu.evertask.domain.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface ProjectRepository extends BaseRepository<Project, UUID>, JpaRepository<Project, UUID> {

    Project getById(UUID id);

    List<Project> findAllByOrganisationId(UUID id);
}
