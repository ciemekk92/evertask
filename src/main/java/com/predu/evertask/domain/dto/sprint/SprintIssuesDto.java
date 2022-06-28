package com.predu.evertask.domain.dto.sprint;

import com.predu.evertask.domain.dto.issue.IssueDto;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class SprintIssuesDto extends SprintDto {

    private List<IssueDto> issues = new ArrayList<>();
}
