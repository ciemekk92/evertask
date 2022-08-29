package com.predu.evertask.domain.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.time.OffsetDateTime;

@Getter
@Setter
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public class BaseDto {

    private String id;

    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss Z")
    private OffsetDateTime createdAt;

    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss Z")
    private OffsetDateTime updatedAt;
}
