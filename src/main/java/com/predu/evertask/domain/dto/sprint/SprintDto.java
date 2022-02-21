package com.predu.evertask.domain.dto.sprint;

import lombok.Data;

import java.util.Date;

@Data
public class SprintDto {

    private String id;
    private Date createdAt;
    private String description;
    private Date startDate;
    private Date finishDate;
}
