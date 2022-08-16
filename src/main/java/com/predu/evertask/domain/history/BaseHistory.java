package com.predu.evertask.domain.history;

import lombok.Getter;
import org.hibernate.envers.RevisionType;

import java.time.OffsetDateTime;

@Getter
public class BaseHistory {

    private final Integer revision;
    private final RevisionType revisionType;
    private final OffsetDateTime revisionDate;

    public BaseHistory(Integer revision, RevisionType revisionType, OffsetDateTime revisionDate) {
        this.revision = revision;
        this.revisionType = revisionType;
        this.revisionDate = revisionDate;
    }
}
