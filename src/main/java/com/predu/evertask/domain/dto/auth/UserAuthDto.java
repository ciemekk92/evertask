package com.predu.evertask.domain.dto.auth;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserAuthDto extends UserDto {

    public UserAuthDto(UserDto userDto, String accessToken, String refreshToken) {
        super(userDto);
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }

    private String accessToken;
    private String refreshToken;

    @Override
    public boolean equals(Object obj) {
        return super.equals(obj);
    }

    @Override
    public int hashCode() {
        return super.hashCode();
    }
}
