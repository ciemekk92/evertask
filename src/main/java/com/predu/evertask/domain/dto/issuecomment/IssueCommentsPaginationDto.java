package com.predu.evertask.domain.dto.issuecomment;

import com.predu.evertask.domain.dto.BasePaginationDto;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class IssueCommentsPaginationDto extends BasePaginationDto {

    @Builder
    public IssueCommentsPaginationDto(Integer currentPage,
                                      Long totalItems,
                                      Integer totalPages,
                                      List<IssueCommentDto> comments) {
        super(currentPage, totalItems, totalPages);
        this.comments = comments;
    }

    private List<IssueCommentDto> comments;
}
