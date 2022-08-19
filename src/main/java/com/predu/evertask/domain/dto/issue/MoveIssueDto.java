package com.predu.evertask.domain.dto.issue;

import com.predu.evertask.annotation.UUID;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MoveIssueDto {

    @UUID
    private String targetSprintId;
}
