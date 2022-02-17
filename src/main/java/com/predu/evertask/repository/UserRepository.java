package com.predu.evertask.repository;

import com.predu.evertask.domain.dto.SearchUsersQuery;
import com.predu.evertask.domain.exception.NotFoundException;
import com.predu.evertask.domain.model.User;
import org.springframework.cache.annotation.CacheConfig;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
@CacheConfig(cacheNames = "users")
public interface UserRepository extends JpaRepository<User, UUID> {

    @CacheEvict(allEntries = true)
    <S extends User> List<S> saveAll(Iterable<S> entities);

    <S extends User> S save(S entity);

    Optional<User> findById(UUID id);

    default User getById(UUID id) {
        Optional<User> optionalUser = findById(id);

        if (optionalUser.isEmpty()) {
            throw new NotFoundException(User.class, id);
        }

        if (!optionalUser.get().isEnabled()) {
            throw new NotFoundException(User.class, id);
        }

        return optionalUser.get();
    }

    Optional<User> findByUsername(String username);
}
