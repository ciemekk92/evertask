package com.predu.evertask.repository;

import com.predu.evertask.config.FlywayMigrationConfig;
import com.predu.evertask.domain.model.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.jdbc.Sql;

import javax.persistence.EntityManager;
import javax.sql.DataSource;
import java.util.List;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;

@ActiveProfiles("test")
@DataJpaTest
@Import(FlywayMigrationConfig.class)
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Sql("classpath:populate.sql")
class UserRepositoryTest {

    private static final String PROJECT_ID = "39718ff6-80cd-4163-bc5f-0fd7f0f502c3";
    private static final String SPRINT_ID = "71e107a2-374d-48df-bdd3-008a99089c9c";

    @Autowired
    private DataSource dataSource;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Autowired
    private EntityManager entityManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

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
        //given
        //when
        List<User> users = userRepository.findActiveProjectMembers(UUID.fromString(PROJECT_ID));

        //then
        assertThat(users).hasSize(1);
    }

    @Test
    void findActiveSprintMembers() {
        //given
        //when
        List<User> users = userRepository.findActiveSprintMembers(UUID.fromString(SPRINT_ID));

        //then
       // assertThat(users).hasSize(1);
    }
}