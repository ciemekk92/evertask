package com.predu.evertask.domain.mapper;

import com.predu.evertask.domain.enums.RevisionTypeDto;
import org.hibernate.envers.RevisionType;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public class RevisionTypeMapper {

    public RevisionTypeDto revisionTypeToRevisionTypeDto(RevisionType source) {

        if (source == null) return null;

        return switch (source) {
            case ADD -> RevisionTypeDto.ADD;
            case MOD -> RevisionTypeDto.MOD;
            case DEL -> RevisionTypeDto.DEL;
        };
    }
}
