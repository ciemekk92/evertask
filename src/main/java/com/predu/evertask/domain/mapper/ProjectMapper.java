package com.predu.evertask.domain.mapper;

import com.predu.evertask.domain.dto.project.ProjectDto;
import com.predu.evertask.domain.dto.project.ProjectSaveDto;
import com.predu.evertask.domain.model.Project;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(uses = UUIDMapper.class, componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public abstract class ProjectMapper {

    @Mapping(target = "issues", ignore = true)
    public abstract Project projectSaveDtoToProject(ProjectSaveDto projectSaveDto);

    @InheritInverseConfiguration(name = "projectSaveDtoToProject")
    public abstract ProjectSaveDto projectToProjectSaveDto(Project project);

    public abstract ProjectDto projectToProjectDto(Project project);
}
