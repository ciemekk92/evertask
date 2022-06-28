package com.predu.evertask.repository;

import com.predu.evertask.domain.model.Sprint;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface SprintRepository extends JpaRepository<Sprint, UUID>, BaseRepository<Sprint, UUID> {

    List<Sprint> findAllByProjectIdOrderByOrdinalDesc(UUID projectId);

    List<Sprint> findAllByProjectIdAndCompletedIsFalseOrderByOrdinalAsc(UUID projectId);
}
