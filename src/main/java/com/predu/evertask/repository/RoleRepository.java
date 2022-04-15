package com.predu.evertask.repository;

import com.predu.evertask.domain.model.Role;

public interface RoleRepository {

    Role findByAuthority(String authority);
}
