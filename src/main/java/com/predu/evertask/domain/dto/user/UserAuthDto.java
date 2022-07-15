package com.predu.evertask.domain.dto.user;

import com.predu.evertask.domain.model.Role;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Set;

@Getter
@Setter
public class UserAuthDto extends UserDto {

    public UserAuthDto(UserDto userDto, String accessToken, String refreshToken,
                       Set<Role> authorities, boolean mfaEnabled) {
        super(userDto);
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.mfaEnabled = mfaEnabled;
        this.authorities = authorities
                .stream()
                .map(Role::getAuthority)
                .toList();
    }

    private String accessToken;
    private String refreshToken;

    private boolean mfaEnabled;
    private List<String> authorities;

    @Override
    public boolean equals(Object obj) {
        return super.equals(obj);
    }

    @Override
    public int hashCode() {
        return super.hashCode();
    }
}
