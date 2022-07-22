package com.predu.evertask.domain.dto.issue;

import com.predu.evertask.annotation.RequiredWhenStatus;
import com.predu.evertask.domain.dto.BaseDto;
import lombok.*;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotBlank;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@RequiredWhenStatus(selected = "status", values = {"CODE_REVIEW"}, required = "pullRequestUrl")
public class IssueSaveDto extends BaseDto {

    @Length(min = 6, max = 50)
    private String title;

    private Integer estimateStoryPoints;
    private Integer estimateHours;
    private Integer key;

    @NotBlank
    private String description;

    private String pullRequestUrl;
    private String status;
    private String type;
    private String priority;

    @NotBlank
    private String projectId;

    private String parentId;
    private String assigneeId;
    private String sprintId;

    private List<IssueSaveDto> subtasks = new ArrayList<>();
}
