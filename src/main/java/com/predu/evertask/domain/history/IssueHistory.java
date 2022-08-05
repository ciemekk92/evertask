package com.predu.evertask.domain.history;

import com.predu.evertask.domain.model.Issue;
import lombok.Getter;
import org.hibernate.envers.RevisionType;

@Getter
public class IssueHistory extends BaseHistory {

    private final Issue issue;

    public IssueHistory(Issue issue, Integer revision, RevisionType revisionType) {
        super(revision, revisionType);
        this.issue = issue;
    }
}
