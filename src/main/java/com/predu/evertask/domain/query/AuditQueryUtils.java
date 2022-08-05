package com.predu.evertask.domain.query;

import org.hibernate.envers.query.AuditQuery;

import java.util.ArrayList;
import java.util.List;

public class AuditQueryUtils {

    private AuditQueryUtils() {}

    public static <T> List<AuditQueryResult<T>> getAuditQueryResults(AuditQuery query, Class<T> targetType) {

        List<?> results = query.getResultList();

        if (results == null) {
            return new ArrayList<>();
        }

        return results.stream()
                .filter(Object[].class::isInstance)
                .map(Object[].class::cast)
                .map(obj -> AuditQueryResultUtils.getAuditQueryResult(obj, targetType))
                .toList();
    }
}
