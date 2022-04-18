package com.predu.evertask.domain.dto.organisation;

import com.predu.evertask.domain.dto.BaseDto;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrganisationInvitationDto extends BaseDto {

    OrganisationInfoDto organisation;
}
