package com.predu.evertask.service.audit;

import com.predu.evertask.domain.history.IssueHistory;
import com.predu.evertask.domain.model.Issue;
import com.predu.evertask.domain.query.AuditQueryResult;
import com.predu.evertask.domain.query.AuditQueryUtils;
import com.predu.evertask.repository.SprintRepository;
import com.predu.evertask.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.hibernate.envers.AuditReader;
import org.hibernate.envers.AuditReaderFactory;
import org.hibernate.envers.query.AuditEntity;
import org.hibernate.envers.query.AuditQuery;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class IssueHistoryService implements AbstractHistoryService<IssueHistory> {

    @PersistenceContext
    private EntityManager entityManager;

    private final SprintRepository sprintRepository;
    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    @Override
    public List<IssueHistory> findRevisions(UUID issueID) {

        AuditReader auditReader = AuditReaderFactory.get(entityManager);

        AuditQuery auditQuery = auditReader.createQuery()
                .forRevisionsOfEntity(Issue.class, false, true)
                .add(AuditEntity.id().eq(issueID));

        return AuditQueryUtils.getAuditQueryResults(auditQuery, Issue.class)
                .stream()
                .map(this::getIssueHistory)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<IssueHistory> findRevisionsBySprintId(UUID sprintId) {

        AuditReader auditReader = AuditReaderFactory.get(entityManager);

        AuditQuery auditQuery = auditReader.createQuery()
                .forRevisionsOfEntity(Issue.class, false, false)
                .add(AuditEntity.property("sprintId").eq(sprintId));

        return AuditQueryUtils.getAuditQueryResults(auditQuery, Issue.class)
                .stream()
                .map(this::getIssueHistory)
                .toList();
    }

    private IssueHistory getIssueHistory(AuditQueryResult<Issue> auditQueryResult) {
        Issue issue = auditQueryResult.getEntity();
        issue.setSprint(sprintRepository
                .findByIssuesId(issue.getId())
                .orElse(null));

        issue.setReporter(userRepository
                .findByReportedIssuesId(issue.getId())
                .orElse(null));

        issue.setAssignee(userRepository
                .findByAssignedIssuesId(issue.getId())
                .orElse(null));

        return new IssueHistory(
                issue,
                auditQueryResult.getRevision().getId(),
                auditQueryResult.getType(),
                auditQueryResult.getRevision().getRevisionDate()
        );
    }
}
