package com.predu.evertask.repository;

import com.predu.evertask.domain.model.Issue;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface IssueRepository extends BaseRepository<Issue, UUID> {

    List<Issue> findAllByAssigneeId(UUID assigneeId);

    List<Issue> findAllByProjectId(UUID projectId);

    List<Issue> findAllBySprintId(UUID sprintId);

    List<Issue> findTop10ByProjectIdOrderByCreatedAtDesc(UUID projectId);

    Optional<Issue> findTopByOrderByUpdatedAtDesc();

    Optional<Issue> findTopByOrderByCreatedAtDesc();
}
