package com.predu.evertask.domain.dto.project;

import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class SetCurrentSprintDto {

    @NotNull
    String sprintId;
}
