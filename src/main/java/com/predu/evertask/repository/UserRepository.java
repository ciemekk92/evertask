package com.predu.evertask.repository;

import com.predu.evertask.exception.NotFoundException;
import com.predu.evertask.domain.model.User;
import lombok.NonNull;
import org.springframework.cache.annotation.CacheConfig;
import org.springframework.cache.annotation.CacheEvict;
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

    Optional<User> findByRefreshToken(String token);

    @Query(value = "SELECT * FROM users u " +
            "INNER JOIN user_roles ur ON u.id = ur.user_id " +
            "INNER JOIN roles r ON ur.role_id = r.id " +
            "WHERE (u.username ~ ?1 OR u.email ~ ?1 OR u.first_name ~ ?1 OR u.last_name ~ ?1) " +
            "AND r.authority = 'ROLE_UNASSIGNED_USER' " +
            "AND u.id NOT IN " +
            "(SELECT DISTINCT oi.user_id " +
            "FROM organisation_invitations oi)", nativeQuery = true)
    List<User> findUnassignedByUsernameOrEmail(String username);

    @Query(value = "SELECT * FROM users u " +
            "INNER JOIN user_roles ur ON u.id = ur.user_id " +
            "INNER JOIN roles r ON ur.role_id = r.id " +
            "WHERE r.authority = 'ROLE_UNASSIGNED_USER' " +
            "AND u.id NOT IN " +
            "(SELECT DISTINCT oi.user_id " +
            "FROM organisation_invitations oi)", nativeQuery = true)
    List<User> findUnassigned();

    @Query(value = "SELECT DISTINCT ON(u.id) * FROM users u " +
            "INNER JOIN projects p ON u.organisation_id = p.organisation_id " +
            "LEFT JOIN issues i ON p.id = i.project_id " +
            "WHERE p.id = ?1 " +
            "AND u.id IN (SELECT p.created_by FROM projects p UNION ALL " +
            "SELECT p.modified_by FROM projects p UNION ALL " +
            "SELECT i.assignee_id FROM issues i UNION ALL " +
            "SELECT i.created_by FROM issues i UNION ALL " +
            "SELECT i.modified_by FROM issues i)", nativeQuery = true)
    List<User> findActiveProjectMembers(UUID projectId);

    @Query(value = "SELECT DISTINCT ON(u.id) * FROM users u " +
            "INNER JOIN projects p ON u.organisation_id = p.organisation_id " +
            "LEFT JOIN sprints s ON p.id = s.project_id " +
            "LEFT JOIN issues i ON s.id = i.sprint_id " +
            "WHERE s.id = ?1 " +
            "AND u.id IN (SELECT s.created_by FROM sprints s UNION ALL " +
            "SELECT s.modified_by FROM sprints s UNION ALL " +
            "SELECT i.assignee_id FROM issues i UNION ALL " +
            "SELECT i.created_by FROM issues i UNION ALL " +
            "SELECT i.modified_by FROM issues i)", nativeQuery = true)
    List<User> findActiveSprintMembers(UUID sprintId);

    @NonNull
    default User getById(@NonNull UUID id) {
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

    Optional<User> findByEmail(String email);
}
