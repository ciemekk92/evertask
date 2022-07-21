package com.predu.evertask.domain.dto.issue;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class IssueReportTimeDto {

    private String issueId;
    private Integer reportedHours;
}
