package com.predu.evertask.domain.dto.auth;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserAuthDto extends UserDto {

    public UserAuthDto(UserDto userDto, String token) {
        super(userDto);
        this.accessToken = token;
    }

    private String accessToken;

    @Override
    public boolean equals(Object obj) {
        return super.equals(obj);
    }

    @Override
    public int hashCode() {
        return super.hashCode();
    }
}
