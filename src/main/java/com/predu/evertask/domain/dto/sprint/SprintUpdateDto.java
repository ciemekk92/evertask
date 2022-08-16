package com.predu.evertask.domain.dto.sprint;

import lombok.Getter;
import lombok.Setter;

import java.time.OffsetDateTime;

@Getter
@Setter
public class SprintUpdateDto {

    private String description;
    private OffsetDateTime startDate;
    private OffsetDateTime finishDate;
}
