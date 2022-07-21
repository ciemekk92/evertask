package com.predu.evertask.domain.dto.issue;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class IssueTimeTrackingDto {

    private Integer estimatedHours;
    private Integer totalReportedHours;
    private Integer remainingHours;
}
