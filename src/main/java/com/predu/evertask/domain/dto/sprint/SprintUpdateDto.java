package com.predu.evertask.domain.dto.sprint;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class SprintUpdateDto {

    private String description;
    private Date startDate;
    private Date finishDate;
}
