package com.predu.evertask.domain.dto.organisation;

import com.predu.evertask.domain.dto.BaseDto;
import com.predu.evertask.domain.dto.user.UserDto;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrganisationInvitationDto extends BaseDto {

    OrganisationInfoDto organisation;
    UserDto user;
}
