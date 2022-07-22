package com.predu.evertask.domain.dto.issuecomment;

import com.predu.evertask.domain.dto.BaseDto;
import com.predu.evertask.domain.dto.user.UserIssueDto;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class IssueCommentDto extends BaseDto {

    private UserIssueDto createdBy;
    private String content;
    private List<IssueCommentDto> replies;
}
