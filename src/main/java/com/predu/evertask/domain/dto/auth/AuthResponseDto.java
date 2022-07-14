package com.predu.evertask.domain.dto.auth;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponseDto {

    private boolean mfaEnabled;
    private String accessToken;
    private String refreshToken;
}
