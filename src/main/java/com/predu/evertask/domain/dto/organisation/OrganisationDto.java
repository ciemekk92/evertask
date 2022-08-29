package com.predu.evertask.domain.dto.organisation;

import com.predu.evertask.domain.dto.BaseDto;
import com.predu.evertask.domain.dto.project.ProjectDto;
import com.predu.evertask.domain.dto.user.UserIssueDto;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class OrganisationDto extends BaseDto {

    private String name;
    private String description;
    private List<UserIssueDto> members = new ArrayList<>();
    private List<ProjectDto> projects = new ArrayList<>();
}
