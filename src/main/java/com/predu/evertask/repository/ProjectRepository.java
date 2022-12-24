package com.predu.evertask.repository;

import com.predu.evertask.domain.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ProjectRepository extends  JpaRepository<Project, UUID> {

    List<Project> findAllByOrganisationId(UUID id);

    Optional<Project> findByIssuesId(UUID id);
}
