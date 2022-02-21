package com.predu.evertask.domain.dto.project;

import lombok.Data;

import java.util.Date;

@Data
public class ProjectDto {

    private String id;
    private Date createdAt;
    private String name;
    private String description;
}
