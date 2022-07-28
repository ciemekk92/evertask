package com.predu.evertask.domain.dto.issuecomment;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

@Getter
@Setter
public class IssueCommentUpdateDto {

    @Length(min = 6)
    private String content;
}
