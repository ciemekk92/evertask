package com.predu.evertask.repository;

import com.predu.evertask.domain.model.Role;
import com.predu.evertask.domain.model.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.jdbc.Sql;

import javax.persistence.EntityManager;
import javax.sql.DataSource;
import java.util.List;
import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;

@ActiveProfiles("test")
@DataJpaTest
@AutoConfigureTestDatabase(replace= AutoConfigureTestDatabase.Replace.NONE)
@Sql("populateRoles.sql")
class UserRepositoryTest {

    @Autowired private DataSource dataSource;
    @Autowired private JdbcTemplate jdbcTemplate;
    @Autowired private EntityManager entityManager;
    @Autowired private UserRepository userRepository;
    @Autowired private RoleRepository roleRepository;

    @BeforeEach
    void setUp(TestInfo testInfo) {

        if (testInfo.getDisplayName().equals("injectedComponentsAreNotNull")) {
            return; // skip @BeforeEach in injectedComponentsAreNotNull test
        }

        Role unassignedRole = roleRepository.findByAuthority(Role.ROLE_UNASSIGNED_USER);
        Role assignedRole = roleRepository.findByAuthority(Role.ROLE_USER);
        User unassignedUser1 = User.builder()
                .username("testuser")
                .password("password")
                .firstName("Test")
                .lastName("User")
                .email("test_email@test.com")
                .authorities(Set.of(unassignedRole))
                .build();

        User unassignedUser2 = User.builder()
                .username("other2")
                .password("password")
                .firstName("Test2")
                .lastName("User2")
                .email("other_email2@other.com")
                .authorities(Set.of(unassignedRole))
                .build();

        User assignedUser = User.builder()
                .username("testuser3")
                .password("password123")
                .firstName("Test3")
                .lastName("User3")
                .email("test_email3@test.com")
                .authorities(Set.of(assignedRole))
                .build();

        userRepository.save(unassignedUser1);
        userRepository.save(unassignedUser2);
        userRepository.save(assignedUser);
    }

    @Test
    void injectedComponentsAreNotNull() {
        assertThat(dataSource).isNotNull();
        assertThat(jdbcTemplate).isNotNull();
        assertThat(entityManager).isNotNull();
        assertThat(userRepository).isNotNull();
        assertThat(roleRepository).isNotNull();
    }

    @Test
    void findUnassignedByUsernameOrEmail() {
        //given
        //when
        List<User> users = userRepository.findUnassignedByUsernameOrEmail("test");

        //then
        assertThat(users).hasSize(1);
    }

    @Test
    void findUnassigned() {
        //given
        //when
        List<User> users = userRepository.findUnassigned();

        //then
        assertThat(users).hasSize(2);
    }

    @Test
    void findActiveProjectMembers() {
    }

    @Test
    void findActiveSprintMembers() {
    }
}