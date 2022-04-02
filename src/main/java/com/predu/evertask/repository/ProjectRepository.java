package com.predu.evertask.repository;

import com.predu.evertask.domain.model.Project;
import com.predu.evertask.domain.model.User;

import java.util.List;
import java.util.UUID;

public interface ProjectRepository extends BaseRepository<Project, UUID> {

    List<Project> findByOwnerId(UUID ownerId);

    List<Project> findByOwner(User owner);
}
