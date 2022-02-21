package com.predu.evertask.domain.dto;

import lombok.Data;

import java.util.Date;

@Data
public class SprintSaveDto {

    private String id;
    private Date createdAt;
    private Date updatedAt;
    private String description;
    private Date startDate;
    private Date finishDate;
}
