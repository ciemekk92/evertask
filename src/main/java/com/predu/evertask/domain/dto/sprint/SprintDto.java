package com.predu.evertask.domain.dto.sprint;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.predu.evertask.domain.dto.BaseDto;
import lombok.*;

import java.util.Date;

@Getter
@Setter
public class SprintDto extends BaseDto {

    private String id;
    private String projectId;
    private Integer ordinal;
    private String description;
    private boolean isCompleted;

    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss Z")
    private Date startDate;

    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss Z")
    private Date finishDate;
}
