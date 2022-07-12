package com.predu.evertask.domain.dto.user;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

@Getter
@Setter
public class UserDetailsUpdateDto {

    @Length(max = 30)
    private String firstName;

    @Length(max = 30)
    private String lastName;

    @Length(max = 60)
    private String email;

    private String bio;

    @Length(max = 30)
    private String phoneNumber;
}
