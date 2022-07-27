package com.predu.evertask.domain.dto.issuecomment;

import com.predu.evertask.domain.dto.BaseDto;
import com.predu.evertask.domain.dto.user.UserIssueDto;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class IssueCommentDto extends BaseDto {

    private String parentId;
    private UserIssueDto createdBy;
    private String content;
    private IssueCommentDto firstReply;
    private boolean hasMoreReplies;
}
