package com.predu.evertask.domain.dto.sprint;

import lombok.Data;

import java.util.Date;

@Data
public class SprintSaveDto {

    private String description;
    private Date startDate;
    private Date finishDate;
    private String projectId;
}
