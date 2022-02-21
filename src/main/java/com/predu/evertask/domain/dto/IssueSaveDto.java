package com.predu.evertask.domain.dto;

import lombok.Data;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Data
public class IssueSaveDto {

    private String id;
    private Date createdAt;
    private Date updatedAt;
    private String title;
    private int estimateStoryPoints;
    private int estimateHours;
    private String pullRequestUrl;
    private String status;
    private String type;
    private String priority;
    private String projectId;
    private String parentId;
    private String assigneeId;
    private String reporterId;
    private String sprintId;
    private Set<IssueSaveDto> subtasks = new HashSet<>();
}
