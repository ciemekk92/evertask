package com.predu.evertask.domain.dto.auth;

import lombok.Data;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Data
public class CreateUserRequest {

    @Length(min = 6, max = 30)
    private String username;

    @NotBlank
    @Length(max = 30)
    private String firstName;

    @NotBlank
    @Length(max = 30)
    private String lastName;

    @NotBlank @Email
    private String email;

    @Length(min = 8, max = 30)
    private String password;

    @Length(min = 8, max = 30)
    private String rePassword;
}
