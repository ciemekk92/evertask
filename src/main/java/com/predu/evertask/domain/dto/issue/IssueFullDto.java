package com.predu.evertask.domain.dto.issue;

import com.predu.evertask.domain.dto.BaseDto;
import com.predu.evertask.domain.dto.issuecomment.IssueCommentDto;
import com.predu.evertask.domain.dto.project.ProjectInfoDto;
import com.predu.evertask.domain.dto.sprint.SprintInfoDto;
import com.predu.evertask.domain.dto.user.UserIssueDto;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class IssueFullDto extends BaseDto {

    private String title;
    private Integer estimateStoryPoints;
    private Integer estimateHours;
    private Integer key;
    private String description;
    private String pullRequestUrl;
    private String status;
    private String type;
    private String priority;
    private ProjectInfoDto project;
    private String parentId;
    private UserIssueDto assignee;
    private UserIssueDto reporter;
    private SprintInfoDto sprint;
    private List<IssueDto> subtasks = new ArrayList<>();
}
