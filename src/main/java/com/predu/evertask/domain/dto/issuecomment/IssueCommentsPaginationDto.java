package com.predu.evertask.domain.dto.issuecomment;

import com.predu.evertask.domain.dto.BasePaginationDto;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Getter
@Setter
@SuperBuilder
public class IssueCommentsPaginationDto extends BasePaginationDto {

    private List<IssueCommentDto> comments;
}
