package com.predu.evertask.domain.dto.auth;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

@Getter
@Setter
public class ChangePasswordRequestDto {

    @Length(min = 8, max = 30)
    private String password;

    @Length(min = 8, max = 30)
    private String rePassword;

    @Length(min = 8, max = 30)
    private String newPassword;
}
