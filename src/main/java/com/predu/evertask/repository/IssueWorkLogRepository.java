package com.predu.evertask.repository;

import com.predu.evertask.domain.model.IssueWorkLog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface IssueWorkLogRepository extends BaseRepository<IssueWorkLog, UUID>,
        JpaRepository<IssueWorkLog, UUID> {

    List<IssueWorkLog> findAllByIssueId(UUID id);
}
