package com.predu.evertask.service;

import com.predu.evertask.annotation.WithMockCustomUser;
import com.predu.evertask.config.FlywayMigrationConfig;
import com.predu.evertask.domain.dto.issue.IssueDto;
import com.predu.evertask.domain.dto.issue.IssueSaveDto;
import com.predu.evertask.domain.dto.issue.IssuesPaginationDto;
import com.predu.evertask.domain.enums.IssuePriority;
import com.predu.evertask.domain.enums.IssueStatus;
import com.predu.evertask.domain.enums.IssueType;
import com.predu.evertask.domain.model.Issue;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.jdbc.Sql;

import java.util.Collections;
import java.util.List;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;

@ActiveProfiles("test")
@Import(FlywayMigrationConfig.class)
@SpringBootTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Sql("classpath:populate.sql")
class IssueServiceTest {

    private static final String PROJECT_ID_STRING = "39718ff6-80cd-4163-bc5f-0fd7f0f502c3";
    private static final UUID USER_ID = UUID.fromString("57191890-ff22-4386-a2ea-869c9f6a3ea8");

    @Autowired
    private IssueService issueService;

    @Test
    void injectedComponentsAreNotNull() {
        assertThat(issueService).isNotNull();
    }

    @WithMockCustomUser
    @Test
    void when_create_issue_return_issue_dto() {
        //given
        IssueSaveDto dto = IssueSaveDto.builder()
                .title("TestTitle")
                .description("Test description")
                .projectId(PROJECT_ID_STRING)
                .subtasks(Collections.emptyList())
                .status(IssueStatus.TO_DO.toString())
                .type(IssueType.BUG.toString())
                .priority(IssuePriority.ASAP.toString())
                .build();

        //when
        Issue created = issueService.create(dto, USER_ID);

        //then
        assertEquals(created.getTitle(), dto.getTitle());
    }

    @WithMockCustomUser
    @Test
    void when_find_project_current_issues_return_dto_list() {

        //given
        //when
        List<IssueDto> issues = issueService.findProjectsCurrentIssues(UUID.fromString(PROJECT_ID_STRING));

        //then
        // Should return 0, when there is no active sprint set on project
        assertEquals(0, issues.size());
    }

    @WithMockCustomUser
    @Test
    void when_find_all_unassigned_by_project_id_return_pagination_dto_list() {

        //given
        Pageable paging = PageRequest.of(0, 10);

        //when
        IssuesPaginationDto issues = issueService.findAllUnassignedByProjectId(UUID.fromString(PROJECT_ID_STRING), "", paging);

        //then
        assertEquals(2, issues.getTotalItems());
    }
}