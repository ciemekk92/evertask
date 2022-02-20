package com.predu.evertask.repository;

import com.predu.evertask.domain.model.Project;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ProjectRepository {

    Optional<Project> findById(UUID projectId);

    List<Project> findAll();

    Page<Project> findAll(Pageable page);

    boolean existsById(UUID id);

    Project save(Project project);

    void delete(Project project);

    void deleteById(UUID id);
}
