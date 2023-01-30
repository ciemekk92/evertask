package com.predu.evertask.domain.dto.auth;

import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Data
public class ResetPasswordRequest {

    @NotBlank
    @Email
    private String email;
}
