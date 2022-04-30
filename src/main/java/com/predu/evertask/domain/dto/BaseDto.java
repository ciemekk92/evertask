package com.predu.evertask.domain.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BaseDto {

    private String id;

    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss Z")
    private Date createdAt;

    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss Z")
    private Date updatedAt;
}
