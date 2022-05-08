package com.predu.evertask.domain.dto.project;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.predu.evertask.domain.dto.BaseDto;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class ProjectDto extends BaseDto {

    private String name;
    private String description;
    private String code;
    private String methodology;

    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date lastUpdatedAt;
}
