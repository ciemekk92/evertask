package com.predu.evertask.domain.dto.auth;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
public class UserDto {

    public UserDto(UserDto user) {
        this.id = user.getId();
        this.username = user.getUsername();
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        this.email = user.getEmail();
    }

    private UUID id;
    private String username;
    private String firstName;
    private String lastName;
    private String email;
}
