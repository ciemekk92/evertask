package com.predu.evertask.repository;

import com.predu.evertask.domain.model.Issue;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface IssueRepository extends BaseRepository<Issue, UUID>,
        JpaRepository<Issue, UUID> {

    List<Issue> findAllByAssigneeId(UUID assigneeId);

    List<Issue> findAllByProjectId(UUID projectId);

    List<Issue> findAllByProjectIdAndCreatedAtBetween(UUID projectId, OffsetDateTime startDate, OffsetDateTime endDate);

    List<Issue> findAllBySprintId(UUID sprintId);

    List<Issue> findAllByProjectIdAndSprintIsNull(UUID projectId);

    List<Issue> findTop10ByProjectIdOrderByCreatedAtDesc(UUID projectId);

    Optional<Issue> findTopByProjectIdOrderByUpdatedAtDesc(UUID projectId);

    Optional<Issue> findTopByProjectIdOrderByCreatedAtDesc(UUID projectId);
}
