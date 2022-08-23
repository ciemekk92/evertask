package com.predu.evertask.domain.mapper;

import org.mapstruct.Mapper;

import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.time.ZoneId;

@Mapper(componentModel = "spring")
public class DateMapper {

    public OffsetDateTime fromLocalDate(LocalDate source) {

        if (source != null) {
            return source.atStartOfDay(ZoneId.systemDefault()).toOffsetDateTime();
        }

        return null;
    }
}
