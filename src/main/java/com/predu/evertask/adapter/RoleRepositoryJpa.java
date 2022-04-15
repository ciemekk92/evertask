package com.predu.evertask.adapter;

import com.predu.evertask.domain.model.Role;
import com.predu.evertask.repository.RoleRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface RoleRepositoryJpa extends RoleRepository, JpaRepository<Role, UUID> {
}
