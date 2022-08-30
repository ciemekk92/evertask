package com.predu.evertask.repository;

import com.predu.evertask.domain.model.Issue;
import org.flywaydb.core.Flyway;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.event.annotation.AfterTestClass;
import org.springframework.test.context.event.annotation.BeforeTestClass;
import org.springframework.test.context.jdbc.Sql;

import javax.persistence.EntityManager;
import javax.sql.DataSource;
import java.util.List;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;

@ActiveProfiles("test")
@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Sql("populate.sql")
class IssueRepositoryTest {

    private static final String PROJECT_ID = "39718ff6-80cd-4163-bc5f-0fd7f0f502c3";
    private static final String SPRINT_ID = "71e107a2-374d-48df-bdd3-008a99089c9c";

    @Autowired
    private DataSource dataSource;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Autowired
    private EntityManager entityManager;

    @Autowired
    private IssueRepository issueRepository;

    @Autowired
    private Flyway flyway;

    @BeforeTestClass
    public void init() {
        flyway.clean();
        flyway.migrate();
    }

    @AfterTestClass
    public void cleanUp() {
        flyway.clean();
    }

    @Test
    void injectedComponentsAreNotNull() {
        assertThat(dataSource).isNotNull();
        assertThat(jdbcTemplate).isNotNull();
        assertThat(entityManager).isNotNull();
        assertThat(issueRepository).isNotNull();
    }

    @Test
    void findAllBySprintIdAndIsNotSubtask() {
        //given
        //when
        List<Issue> issues = issueRepository.findAllBySprintIdAndIsNotSubtask(UUID.fromString(SPRINT_ID));

        //then
        assertThat(issues).hasSize(2);
    }

    @Test
    void findAllByProjectIdAndSprintIsNullOrderByKeyDesc() {
        //given
        Pageable paging = PageRequest.of(0, 10);
        //when
        Page<Issue> issues = issueRepository.findAllByProjectIdAndSprintIsNullOrderByKeyDesc(UUID.fromString(PROJECT_ID), "", paging);

        //then
        assertEquals(2L, issues.getTotalElements());
    }
}