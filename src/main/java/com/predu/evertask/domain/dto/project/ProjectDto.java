package com.predu.evertask.domain.dto.project;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.predu.evertask.domain.dto.BaseDto;
import com.predu.evertask.domain.dto.sprint.SprintDto;
import lombok.Getter;
import lombok.Setter;

import java.time.OffsetDateTime;

@Getter
@Setter
public class ProjectDto extends BaseDto {

    private String name;
    private String description;
    private String code;
    private String methodology;
    private String organisationId;

    private SprintDto activeSprint;

    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private OffsetDateTime lastUpdatedAt;
}
