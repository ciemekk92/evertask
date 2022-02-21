package com.predu.evertask.domain.dto.auth;

import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import java.util.Set;

@Data
public class CreateUserRequest {

    @NotBlank
    private String username;

    @NotBlank
    private String firstName;

    @NotBlank
    private String lastName;

    @NotBlank @Email
    private String email;

    @NotBlank
    private String password;

    @NotBlank
    private String rePassword;

    private Set<String> authorities;
}
