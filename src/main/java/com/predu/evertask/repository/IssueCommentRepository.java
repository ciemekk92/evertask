package com.predu.evertask.repository;

import com.predu.evertask.domain.model.IssueComment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface IssueCommentRepository extends BaseRepository<IssueComment, UUID>,
        JpaRepository<IssueComment, UUID> {
}