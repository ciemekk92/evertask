package com.predu.evertask.controller;

import com.predu.evertask.domain.enums.ProjectMethodology;
import com.predu.evertask.domain.model.Issue;
import com.predu.evertask.domain.model.Organisation;
import com.predu.evertask.domain.model.Project;
import com.predu.evertask.repository.IssueRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.time.ZoneId;
import java.util.Optional;
import java.util.UUID;

import static org.hamcrest.Matchers.containsString;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@ActiveProfiles("test")
@AutoConfigureMockMvc(addFilters = false)
class IssueControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private IssueRepository issueRepository;

    Organisation mockOrganisation = Organisation.builder()
            .id(UUID.fromString("e527ae4c-517d-42d0-8c6c-e4eb8ced6b94"))
            .createdAt(OffsetDateTime.from(LocalDate.now().atStartOfDay(ZoneId.systemDefault())))
            .name("Test organisation")
            .description("Test organisation")
            .build();

    Project mockProject = Project.builder()
            .id(UUID.fromString("e7a6949f-15fc-4a75-9512-556cf383a0a6"))
            .createdAt(OffsetDateTime.from(LocalDate.now().atStartOfDay(ZoneId.systemDefault())))
            .name("Test project")
            .code("TST")
            .methodology(ProjectMethodology.AGILE)
            .organisation(mockOrganisation)
            .build();

    Issue mockIssue = Issue.builder()
            .id(UUID.fromString("72dbe1ce-3e8c-4a4a-aff4-6c0cbf002d6b"))
            .createdAt(OffsetDateTime.from(LocalDate.now().atStartOfDay(ZoneId.systemDefault())))
            .title("Test issue")
            .description("<p>Test</p>")
            .key(1)
            .project(mockProject)
            .build();


    @Test
    @WithMockUser(roles = "ADMIN")
    void getIssue() throws Exception {

        //given
        //when
        when(issueRepository.findById(any(UUID.class)))
                .thenReturn(Optional.of(mockIssue));

        //then - Issue DTO must contain correct project ID
        mockMvc.perform(get("/api/issues/72dbe1ce-3e8c-4a4a-aff4-6c0cbf002d6b"))
                .andExpect(status().is2xxSuccessful())
                .andExpect(content().string(containsString("e7a6949f-15fc-4a75-9512-556cf383a0a6")));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void getFullIssueInfo() throws Exception {

        //given
        //when
        when(issueRepository.findById(any(UUID.class)))
                .thenReturn(Optional.of(mockIssue));

        //then - Issue DTO must contain full project
        mockMvc.perform(get("/api/issues/72dbe1ce-3e8c-4a4a-aff4-6c0cbf002d6b/full"))
                .andExpect(status().is2xxSuccessful())
                .andExpect(content().string(containsString("Test project")));
    }
}