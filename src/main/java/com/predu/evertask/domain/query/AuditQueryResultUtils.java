package com.predu.evertask.domain.query;

import com.predu.evertask.domain.model.AuditRevisionEntity;
import org.hibernate.envers.RevisionType;

public class AuditQueryResultUtils {

    private AuditQueryResultUtils() {}

    public static <T> AuditQueryResult<T> getAuditQueryResult(Object[] item, Class<T> type) {

        if (item == null || item.length < 3) {
            return null;
        }

        T entity = null;

        if (type.isInstance(item[0])) {
            entity = type.cast(item[0]);
        }

        AuditRevisionEntity revision = null;

        if (item[1] instanceof AuditRevisionEntity) {
            revision = (AuditRevisionEntity) item[1];
        }

        RevisionType revisionType = null;
        if (item[2] instanceof RevisionType) {
            revisionType = (RevisionType) item[2];
        }

        return new AuditQueryResult<>(entity, revision, revisionType);
    }
}
