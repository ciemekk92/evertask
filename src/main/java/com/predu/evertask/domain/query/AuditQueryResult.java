package com.predu.evertask.domain.query;

import com.predu.evertask.domain.model.AuditRevisionEntity;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.hibernate.envers.RevisionType;

@Getter
@RequiredArgsConstructor
public class AuditQueryResult<T> {

    private final T entity;
    private final AuditRevisionEntity revision;
    private final RevisionType type;
}
