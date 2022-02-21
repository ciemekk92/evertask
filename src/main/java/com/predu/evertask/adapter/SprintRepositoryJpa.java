package com.predu.evertask.adapter;

import com.predu.evertask.domain.model.Sprint;
import com.predu.evertask.repository.SprintRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface SprintRepositoryJpa extends SprintRepository, JpaRepository<Sprint, UUID> {
}
