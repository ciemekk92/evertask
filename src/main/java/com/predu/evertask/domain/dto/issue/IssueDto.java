package com.predu.evertask.domain.dto.issue;

import com.predu.evertask.domain.dto.BaseDto;
import com.predu.evertask.domain.dto.user.UserIssueDto;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
public class IssueDto extends BaseDto {

    private String title;
    private Integer estimateStoryPoints;
    private Integer estimateHours;
    private Integer key;
    private String description;
    private String pullRequestUrl;
    private String status;
    private String type;
    private String priority;
    private String projectId;
    private String parentId;
    private UserIssueDto assignee;
    private UserIssueDto reporter;
    private String sprintId;
    private Set<IssueDto> subtasks = new HashSet<>();
}