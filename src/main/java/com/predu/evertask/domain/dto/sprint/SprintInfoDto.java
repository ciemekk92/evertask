package com.predu.evertask.domain.dto.sprint;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;

import java.time.OffsetDateTime;

@Getter
@Setter
public class SprintInfoDto {

    private String id;
    private Integer ordinal;
    private String description;
    private boolean isCompleted;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss Z")
    private OffsetDateTime startDate;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss Z")
    private OffsetDateTime finishDate;
}
