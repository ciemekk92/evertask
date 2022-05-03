package com.predu.evertask.adapter;

import com.predu.evertask.domain.model.Project;
import com.predu.evertask.repository.ProjectRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ProjectRepositoryJpa extends ProjectRepository, JpaRepository<Project, UUID> {
}
