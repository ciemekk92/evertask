package com.predu.evertask.domain.history;

import lombok.Getter;
import org.hibernate.envers.RevisionType;

@Getter
public class BaseHistory {

    private final Integer revision;
    private final RevisionType revisionType;

    public BaseHistory(Integer revision, RevisionType revisionType) {
        this.revision = revision;
        this.revisionType = revisionType;
    }
}
