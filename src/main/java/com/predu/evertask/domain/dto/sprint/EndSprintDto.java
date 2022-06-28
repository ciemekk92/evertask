package com.predu.evertask.domain.dto.sprint;

import lombok.Data;

import javax.validation.constraints.NotNull;
import java.util.Date;

@Data
public class EndSprintDto {

    @NotNull
    private String sprintId;

    @NotNull
    private Date finishDate;

    private String sprintIdToMoveTo;
}
