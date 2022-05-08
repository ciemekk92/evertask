package com.predu.evertask.repository;

import com.predu.evertask.domain.model.Sprint;

import java.util.List;
import java.util.UUID;

public interface SprintRepository extends BaseRepository<Sprint, UUID>{

    List<Sprint> findAllByProjectIdOrderByOrdinalDesc(UUID projectId);
}
