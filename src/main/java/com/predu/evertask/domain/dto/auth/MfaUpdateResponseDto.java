package com.predu.evertask.domain.dto.auth;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class MfaUpdateResponseDto {

    private boolean mfaEnabled;
    private String qrCodeImage;
}
