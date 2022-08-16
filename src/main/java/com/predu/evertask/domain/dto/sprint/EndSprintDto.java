package com.predu.evertask.domain.dto.sprint;

import lombok.Data;

import javax.validation.constraints.NotNull;
import java.time.LocalDate;

@Data
public class EndSprintDto {

    @NotNull
    private String sprintId;

    @NotNull
    private LocalDate finishDate;

    private String sprintIdToMoveTo;
}
