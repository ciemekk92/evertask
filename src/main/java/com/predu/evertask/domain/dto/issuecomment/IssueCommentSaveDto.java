package com.predu.evertask.domain.dto.issuecomment;

import com.predu.evertask.annotation.UUID;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

@Getter
@Setter
public class IssueCommentSaveDto {

    @Length(min = 6)
    private String content;

    @UUID
    private String parentId;
}
