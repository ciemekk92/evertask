package com.predu.evertask.repository;

import com.predu.evertask.domain.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface RoleRepository extends JpaRepository<Role, UUID> {

    Role findByAuthority(String authority);
}
