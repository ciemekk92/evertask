package com.predu.evertask.domain.dto.sprint;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import java.time.LocalDate;

@Getter
@Setter
public class SprintUpdateDto {

    private String description;

    @JsonFormat(pattern = "yyyy-MM-dd")
    @NotNull
    private LocalDate startDate;

    @JsonFormat(pattern = "yyyy-MM-dd")
    @NotNull
    private LocalDate finishDate;
}
