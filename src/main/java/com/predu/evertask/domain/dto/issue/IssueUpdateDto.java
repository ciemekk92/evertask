package com.predu.evertask.domain.dto.issue;

import lombok.Data;

import java.util.HashSet;
import java.util.Set;

@Data
public class IssueUpdateDto {
    private String title;
    private int estimateStoryPoints;
    private int estimateHours;
    private String pullRequestUrl;
    private String status;
    private String type;
    private String priority;
    private String parentId;
    private String assigneeId;
    private String reporterId;
    private String sprintId;
    private Set<IssueDto> subtasks = new HashSet<>();
}
