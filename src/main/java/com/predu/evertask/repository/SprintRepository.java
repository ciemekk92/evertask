package com.predu.evertask.repository;

import com.predu.evertask.domain.model.Sprint;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface SprintRepository extends JpaRepository<Sprint, UUID> {

    List<Sprint> findAllByProjectIdOrderByOrdinalDesc(UUID projectId);

    List<Sprint> findAllByProjectIdAndCompletedIsFalseOrderByOrdinalAsc(UUID projectId);

    List<Sprint> findAllByProjectIdAndCompletedIsTrueOrderByOrdinalDesc(UUID projectId);

    List<Sprint> findTop8ByProjectIdOrderByOrdinalAsc(UUID projectId);

    Optional<Sprint> findByIssuesId(UUID id);
}
