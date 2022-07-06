package com.predu.evertask.domain.dto.user;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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
        this.avatar = user.getAvatar();
    }

    private String id;
    private String username;
    private String firstName;
    private String lastName;
    private String email;
    private String avatar;
}
