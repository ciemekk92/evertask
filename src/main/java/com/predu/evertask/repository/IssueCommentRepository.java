package com.predu.evertask.repository;

import com.predu.evertask.domain.model.IssueComment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface IssueCommentRepository extends BaseRepository<IssueComment, UUID>,
        JpaRepository<IssueComment, UUID> {

    Page<IssueComment> findAllByIssueIdAndParentIsNullOrderByCreatedAtAsc(UUID id, Pageable pageable);

    Page<IssueComment> findAllByIssueIdAndParentIdOrderByCreatedAtAsc(UUID issueId,
                                                                       UUID parentId,
                                                                       Pageable pageable);


}