package com.predu.evertask.domain.dto.issue;

import com.predu.evertask.annotation.EnumValidator;
import com.predu.evertask.domain.enums.IssuePriority;
import com.predu.evertask.domain.enums.IssueStatus;
import com.predu.evertask.domain.enums.IssueType;
import lombok.Data;

import java.util.HashSet;
import java.util.Set;

@Data
public class IssueUpdateDto {
    private String title;
    private Integer estimateStoryPoints;
    private Integer estimateHours;
    private String description;
    private String pullRequestUrl;

    @EnumValidator(enumerated = IssueStatus.class)
    private String status;

    @EnumValidator(enumerated = IssueType.class)
    private String type;

    @EnumValidator(enumerated = IssuePriority.class)
    private String priority;

    private String parentId;
    private String assigneeId;
    private String reporterId;
    private String sprintId;
    private Set<IssueDto> subtasks = new HashSet<>();
}
