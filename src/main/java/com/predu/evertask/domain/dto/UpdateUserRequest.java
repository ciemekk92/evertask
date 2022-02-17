package com.predu.evertask.domain.dto;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import java.util.Set;

@Data
public class UpdateUserRequest {

    @NotBlank
    private String firstName;

    @NotBlank
    private String lastName;
    private Set<String> authorities;
}
