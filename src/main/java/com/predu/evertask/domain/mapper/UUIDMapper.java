package com.predu.evertask.domain.mapper;

import org.mapstruct.Mapper;

import java.util.UUID;

@Mapper(componentModel = "spring")
public class UUIDMapper {

    public String uuidToString(UUID uuid) {
        return uuid.toString();
    }

    public UUID stringToUUID(String string) {
        return UUID.fromString(string);
    }
}
