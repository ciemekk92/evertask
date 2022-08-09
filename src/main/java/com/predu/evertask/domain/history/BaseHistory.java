package com.predu.evertask.domain.history;

import lombok.Getter;
import org.hibernate.envers.RevisionType;

import java.util.Date;

@Getter
public class BaseHistory {

    private final Integer revision;
    private final RevisionType revisionType;
    private final Date revisionDate;

    public BaseHistory(Integer revision, RevisionType revisionType, Date revisionDate) {
        this.revision = revision;
        this.revisionType = revisionType;
        this.revisionDate = revisionDate;
    }
}
