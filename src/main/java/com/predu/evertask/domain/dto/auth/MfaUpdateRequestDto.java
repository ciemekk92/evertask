package com.predu.evertask.domain.dto.auth;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;

@Getter
@Setter
public class MfaUpdateRequestDto {

    @NotNull
    private boolean mfaEnabled;
}
