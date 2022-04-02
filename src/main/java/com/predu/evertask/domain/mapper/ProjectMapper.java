package com.predu.evertask.domain.mapper;

import com.predu.evertask.domain.dto.project.ProjectDto;
import com.predu.evertask.domain.dto.project.ProjectSaveDto;
import com.predu.evertask.domain.model.Project;
import com.predu.evertask.domain.model.User;
import com.predu.evertask.repository.UserRepository;
import org.mapstruct.*;
import org.springframework.beans.factory.annotation.Autowired;

@Mapper(uses = UUIDMapper.class, componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public abstract class ProjectMapper {

    @Autowired
    private UserRepository userRepository;

    @Mapping(target = "issues", ignore = true)
    @Mapping(target = "owner", ignore = true)
    public abstract Project projectSaveDtoToProject(ProjectSaveDto projectSaveDto);

    @InheritInverseConfiguration(name = "projectSaveDtoToProject")
    public abstract ProjectSaveDto projectToProjectSaveDto(Project project);

    public abstract ProjectDto projectToProjectDto(Project project);

    @AfterMapping
    protected void afterProjectSaveDtoToProject(ProjectSaveDto dto, @MappingTarget Project project) {
        if (dto.getOwnerId() != null) {
            User owner = userRepository.getById(dto.getOwnerId());

            project.setOwner(owner);
        }
    }
}
