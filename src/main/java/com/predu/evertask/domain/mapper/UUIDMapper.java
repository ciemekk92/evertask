package com.predu.evertask.domain.mapper;

import org.mapstruct.Mapper;

import java.util.UUID;

@Mapper(componentModel = "spring")
public class UUIDMapper {

    public String uuidToString(UUID uuid) {
        if (uuid == null) {
            return null;
        }

        return uuid.toString();
    }

    public UUID stringToUUID(String string) {
        if (string == null) {
            return null;
        }

        return UUID.fromString(string);
    }
}
