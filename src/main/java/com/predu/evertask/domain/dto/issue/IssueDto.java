package com.predu.evertask.domain.dto.issue;

import com.predu.evertask.domain.dto.BaseDto;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
public class IssueDto extends BaseDto {

    private String title;
    private int estimateStoryPoints;
    private int estimateHours;
    private int key;
    private String description;
    private String pullRequestUrl;
    private String status;
    private String type;
    private String priority;
    private String projectId;
    private String parentId;
    private String assigneeId;
    private String reporterId;
    private String sprintId;
    private Set<IssueDto> subtasks = new HashSet<>();
}
