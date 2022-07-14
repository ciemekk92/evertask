package com.predu.evertask.domain.dto.auth;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

@Getter
@Setter
public class VerifyCodeDto {

    @Length(min = 6, max = 6)
    private String code;
}
