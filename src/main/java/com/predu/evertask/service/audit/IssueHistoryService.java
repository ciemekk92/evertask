package com.predu.evertask.service.audit;

import com.predu.evertask.domain.enums.IssueStatus;
import com.predu.evertask.domain.history.BaseHistory;
import com.predu.evertask.domain.history.IssueHistory;
import com.predu.evertask.domain.model.Issue;
import com.predu.evertask.domain.query.AuditQueryResult;
import com.predu.evertask.domain.query.AuditQueryUtils;
import com.predu.evertask.exception.NoChartsDataException;
import com.predu.evertask.repository.ProjectRepository;
import com.predu.evertask.repository.SprintRepository;
import com.predu.evertask.repository.UserRepository;
import com.predu.evertask.util.DateUtil;
import lombok.RequiredArgsConstructor;
import org.hibernate.envers.AuditReader;
import org.hibernate.envers.AuditReaderFactory;
import org.hibernate.envers.query.AuditEntity;
import org.hibernate.envers.query.AuditQuery;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.time.LocalDate;
import java.time.ZoneOffset;
import java.util.*;
import java.util.stream.Collectors;


@RequiredArgsConstructor
@Service
public class IssueHistoryService implements AbstractHistoryService<IssueHistory> {

    @PersistenceContext
    private EntityManager entityManager;

    private final SprintRepository sprintRepository;
    private final UserRepository userRepository;
    private final ProjectRepository projectRepository;

    @Transactional(readOnly = true)
    @Override
    public List<IssueHistory> findRevisions(UUID issueID) {

        AuditReader auditReader = AuditReaderFactory.get(entityManager);

        AuditQuery auditQuery = auditReader.createQuery()
                .forRevisionsOfEntity(Issue.class, false, true)
                .add(AuditEntity.id().eq(issueID));

        return getIssueHistories(auditQuery);
    }

    @Transactional(readOnly = true)
    public List<IssueHistory> findRevisionsBySprintId(UUID sprintId) {

        AuditReader auditReader = AuditReaderFactory.get(entityManager);

        AuditQuery auditQuery = auditReader.createQuery()
                .forRevisionsOfEntity(Issue.class, false, false)
                .add(AuditEntity.property("sprint_id").eq(sprintId));

        return getIssueHistories(auditQuery);
    }

    public List<IssueHistory> findRevisionsByProjectId(UUID projectId) {

        AuditReader auditReader = AuditReaderFactory.get(entityManager);

        AuditQuery auditQuery = auditReader.createQuery()
                .forRevisionsOfEntity(Issue.class, false, false)
                .add(AuditEntity.property("project_id").eq(projectId));

        return getIssueHistories(auditQuery);
    }

    public Collection<List<IssueHistory>> groupRevisionsInDateRangeById(Collection<IssueHistory> revisions, LocalDate startDate, long dateRangeOffset) {
        return revisions
                .stream()
                .filter(rev -> DateUtil.addDaysToDateAndConvertToODTEndOfDay(startDate, dateRangeOffset).isAfter(rev.getRevisionDate()))
                .collect(Collectors.groupingBy(rev -> rev.getIssue().getId()))
                .values();
    }

    public List<IssueHistory> filterIssuesRevisions(Collection<IssueHistory> revisions,
                                                     LocalDate borderDate,
                                                     boolean shouldFilterOnlyAccepted) throws NoChartsDataException {

        try {
            return revisions
                    .stream()
                    .filter(rev -> borderDate.isAfter(rev.getRevisionDate().toLocalDate())
                            && (shouldFilterOnlyAccepted == rev.getIssue().getStatus().equals(IssueStatus.ACCEPTED)))
                    .collect(Collectors.groupingBy(rev -> rev.getIssue().getId()))
                    .values().stream()
                    .map(list -> list
                            .stream()
                            .max(Comparator.comparing(BaseHistory::getRevisionDate)).orElseThrow())
                    .toList();
        } catch (NoSuchElementException e) {
            throw new NoChartsDataException("noData");
        }
    }

    public double sumRevisionStoryPoints(Collection<IssueHistory> revisions) {
        return revisions.stream()
                .mapToInt(history -> history.getIssue().getEstimateStoryPoints() == null ? 0 : history.getIssue().getEstimateStoryPoints())
                .sum();
    }

    private List<IssueHistory> getIssueHistories(AuditQuery auditQuery) {
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

        issue.setProject(projectRepository
                .findByIssuesId(issue.getId())
                .orElse(null));

        return new IssueHistory(
                issue,
                auditQueryResult.getRevision().getId(),
                auditQueryResult.getType(),
                auditQueryResult.getRevision().getRevisionDate().toInstant().atOffset(ZoneOffset.UTC)
        );
    }
}
