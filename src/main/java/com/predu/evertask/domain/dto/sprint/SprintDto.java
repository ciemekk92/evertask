package com.predu.evertask.domain.dto.sprint;

import com.predu.evertask.domain.dto.BaseDto;
import lombok.*;

import java.util.Date;

@Getter
@Setter
public class SprintDto extends BaseDto {

    private String description;
    private Date startDate;
    private Date finishDate;
}
