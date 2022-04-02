package com.predu.evertask.repository;

import com.predu.evertask.domain.model.Issue;

import java.util.List;
import java.util.UUID;

public interface IssueRepository extends BaseRepository<Issue, UUID> {

    List<Issue> findByAssigneeId(UUID assigneeId);
}
