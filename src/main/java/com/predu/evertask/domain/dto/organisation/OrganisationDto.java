package com.predu.evertask.domain.dto.organisation;

import com.predu.evertask.domain.dto.BaseDto;
import com.predu.evertask.domain.dto.project.ProjectDto;
import com.predu.evertask.domain.dto.user.UserIssueDto;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
public class OrganisationDto extends BaseDto {

    private String name;
    private String description;
    private Set<UserIssueDto> members = new HashSet<>();
    private Set<ProjectDto> projects = new HashSet<>();
}
