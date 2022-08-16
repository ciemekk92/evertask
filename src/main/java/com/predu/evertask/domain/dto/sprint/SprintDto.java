package com.predu.evertask.domain.dto.sprint;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.predu.evertask.domain.dto.BaseDto;
import lombok.Getter;
import lombok.Setter;

import java.time.OffsetDateTime;

@Getter
@Setter
public class SprintDto extends BaseDto {

    private String projectId;
    private Integer ordinal;
    private String description;
    private boolean isCompleted;

    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss Z")
    private OffsetDateTime startDate;

    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss Z")
    private OffsetDateTime finishDate;
}
