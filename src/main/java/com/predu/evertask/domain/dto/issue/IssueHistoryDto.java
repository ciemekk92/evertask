package com.predu.evertask.domain.dto.issue;

import com.predu.evertask.domain.enums.RevisionTypeDto;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class IssueHistoryDto {

    private IssueFullDto issue;
    private Integer revision;
    private RevisionTypeDto type;
}
