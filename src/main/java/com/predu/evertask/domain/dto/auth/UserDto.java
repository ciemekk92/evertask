package com.predu.evertask.domain.dto.auth;

import lombok.Data;

import java.util.UUID;

@Data
public class UserDto {

    private UUID id;
    private String username;
    private String firstName;
    private String lastName;
}
