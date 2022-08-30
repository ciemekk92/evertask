package com.predu.evertask.util;

import com.predu.evertask.annotation.WithMockCustomUser;
import com.predu.evertask.controller.AuthController;
import com.predu.evertask.domain.dto.sprint.EndSprintDto;
import com.predu.evertask.domain.model.Project;
import com.predu.evertask.exception.InvalidMFACodeException;
import com.predu.evertask.exception.InvalidOperationException;
import com.predu.evertask.exception.NoChartsDataException;
import com.predu.evertask.exception.NotFoundException;
import com.predu.evertask.service.ProjectService;
import com.predu.evertask.service.StatisticsService;
import com.predu.evertask.service.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.test.context.support.WithAnonymousUser;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.multipart.MaxUploadSizeExceededException;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.ValidationException;
import java.nio.charset.StandardCharsets;
import java.util.UUID;

import static org.hamcrest.Matchers.containsString;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@ActiveProfiles("test")
@AutoConfigureMockMvc(addFilters = false)
class CustomRestExceptionHandlerTest {

    @MockBean
    private ProjectService projectService;

    @MockBean
    private StatisticsService statisticsService;

    @MockBean
    private UserService userService;

    @MockBean
    private AuthController authController;

    @Autowired
    private MockMvc mockMvc;

    @WithMockUser(roles = "ADMIN")
    @Test
    void when_ArgumentNotValidException_return_response_with_error() throws Exception {

        //given
        //when
        //then
        mockMvc.perform(post("/api/issues")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{ \"title\": \"Test \", \"description\": \"Test\", \"projectId\": \"39718ff6-80cd-4163-bc5f-0fd7f0f502c3\" }")
                        .characterEncoding(StandardCharsets.UTF_8))
                .andDo(print())
                .andExpect(status().isBadRequest())
                .andExpect(content().string(containsString("title: length must be between 6 and 50")));
    }

    @WithMockUser(roles = "ADMIN")
    @Test
    void when_sprint_completed_return_response_with_error() throws Exception {

        //given
        //when
        doThrow(new InvalidOperationException("completed"))
                .when(projectService)
                .endSprint(any(UUID.class), any(EndSprintDto.class));

        //then
        mockMvc.perform(put("/api/projects/39718ff6-80cd-4163-bc5f-0fd7f0f502c3/end_sprint")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{ \"sprintId\": \"39718ff6-80cd-4163-bc5f-0fd7f0f502c3\", \"sprintIdToMoveTo\": null, \"finishDate\": \"2022-08-30\" }")
                        .characterEncoding(StandardCharsets.UTF_8))
                .andDo(print())
                .andExpect(status().isBadRequest())
                .andExpect(content().string(containsString("Cannot start or end an already completed sprint.")));
    }

    @WithAnonymousUser
    @Test
    void when_validation_exception_return_response_with_error() throws Exception {

        //given
        //when
        when(authController.signup(any(), any()))
                .thenThrow(new ValidationException("passwordsMatch"));

        //then
        mockMvc.perform(post("/api/auth/signup")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{ \"username\": \"test123\", \"password\": \"test1234\", \"rePassword\": \"test1235\", " +
                                "\"firstName\": \"T\", \"lastName\": \"T\", \"email\": \"test_email@test.com\" }")
                        .characterEncoding(StandardCharsets.UTF_8))
                .andDo(print())
                .andExpect(status().isBadRequest())
                .andExpect(content().string(containsString("Passwords don't match.")));
    }

    @WithMockUser(roles = "ADMIN")
    @Test
    void when_no_charts_data_return_response_with_error() throws Exception {

        //given
        //when
        when(statisticsService.getVelocityData(any(UUID.class)))
                .thenThrow(new NoChartsDataException("noData"));

        //then
        mockMvc.perform(get("/api/statistics/velocity/39718ff6-80cd-4163-bc5f-0fd7f0f502c3"))
                .andDo(print())
                .andExpect(status().isBadRequest())
                .andExpect(content().string(containsString("Not enough data to create a chart.")));
    }

    @WithAnonymousUser
    @Test
    void when_bad_credentials_return_response_With_error() throws Exception {

        //given
        //when
        when(authController.login(any(), any()))
                .thenThrow(new BadCredentialsException(""));

        //then
        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{ \"username\": \"t\", \"password\": \"t\" }")
                        .characterEncoding(StandardCharsets.UTF_8))
                .andDo(print())
                .andExpect(status().isUnauthorized())
                .andExpect(content().string(containsString("Username or password is incorrect.")));
    }

    @WithMockUser(roles = "ADMIN")
    @Test
    void when_not_found_return_response_with_error() throws Exception {

        //given
        //when
        when(projectService.findById(any(UUID.class)))
                .thenThrow(new NotFoundException(Project.class, "test"));

        //then
        mockMvc.perform(get("/api/projects/39718ff6-80cd-4163-bc5f-0fd7f0f502c3"))
                .andDo(print())
                .andExpect(status().isNotFound())
                .andExpect(content().string(containsString("Entity Project with id test not found")));
    }

    @WithMockCustomUser
    @Test
    void when_invalid_mfa_code_return_response_with_error() throws Exception {

        //given
        //when
        when(authController.verifyCode(any(), any(), any()))
                .thenThrow(new InvalidMFACodeException(""));

        //then
        mockMvc.perform(post("/api/auth/verify")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{ \"code\": \"123456\" }")
                        .characterEncoding(StandardCharsets.UTF_8))
                .andDo(print())
                .andExpect(status().isBadRequest())
                .andExpect(content().string(containsString("Authenticator code is invalid.")));
    }

    @WithMockCustomUser
    @Test
    void when_max_upload_size_exceedeD_return_response_with_error() throws Exception {

        //given
        MockMultipartFile file = new MockMultipartFile(
                "imageFile",
                "image.jpg",
                MediaType.IMAGE_JPEG_VALUE,
                "testString".getBytes()
        );

        //when
        when(userService.uploadAvatar(any(UUID.class), any(MultipartFile.class)))
                .thenThrow(new MaxUploadSizeExceededException(1L));

        //then
        mockMvc.perform(multipart("/api/user/upload_avatar")
                        .file(file))
                .andDo(print())
                .andExpect(status().isBadRequest())
                .andExpect(content().string(containsString("File size cannot exceed 10 MBs.")));
    }
}