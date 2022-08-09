package com.predu.evertask.domain.history;

import com.predu.evertask.domain.model.Issue;
import lombok.Getter;
import org.hibernate.envers.RevisionType;

import java.util.Date;

@Getter
public class IssueHistory extends BaseHistory {

    private final Issue issue;

    public IssueHistory(Issue issue, Integer revision, RevisionType revisionType, Date revisionDate) {
        super(revision, revisionType, revisionDate);
        this.issue = issue;
    }
}
