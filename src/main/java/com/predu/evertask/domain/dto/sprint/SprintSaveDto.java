package com.predu.evertask.domain.dto.sprint;

import lombok.Data;

import java.time.OffsetDateTime;

@Data
public class SprintSaveDto {

    private String description;
    private OffsetDateTime startDate;
    private OffsetDateTime finishDate;
    private String projectId;
}
