package com.predu.evertask.service.audit;

import com.predu.evertask.domain.history.BaseHistory;

import java.util.List;
import java.util.UUID;

public interface AbstractHistoryService<T extends BaseHistory> {

    List<T> findRevisions(UUID id);
}
