package com.predu.evertask.domain.dto.sprint;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class SprintInfoDto {

    private String id;
    private Integer ordinal;
    private String description;
    private boolean isCompleted;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss Z")
    private Date startDate;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss Z")
    private Date finishDate;
}
