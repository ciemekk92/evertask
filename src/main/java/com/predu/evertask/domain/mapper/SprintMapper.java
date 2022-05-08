package com.predu.evertask.domain.mapper;

import com.predu.evertask.domain.dto.sprint.SprintDto;
import com.predu.evertask.domain.dto.sprint.SprintSaveDto;
import com.predu.evertask.domain.model.Sprint;
import com.predu.evertask.repository.ProjectRepository;
import org.mapstruct.*;
import org.springframework.beans.factory.annotation.Autowired;

@Mapper(uses = UUIDMapper.class, componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public abstract class SprintMapper {

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private UUIDMapper uuidMapper;

    @Mapping(target = "issues", ignore = true)
    @Mapping(target = "ordinal", ignore = true)
    @Mapping(target = "project", ignore = true)
    public abstract Sprint sprintSaveDtoToSprint(SprintSaveDto sprintSaveDto);

    @InheritInverseConfiguration(name = "sprintSaveDtoToSprint")
    public abstract SprintSaveDto sprintToSprintSaveDto(Sprint sprint);

    public abstract SprintDto sprintToSprintDto(Sprint sprint);

    @AfterMapping
    public void afterSprintSaveDtoToSprint(SprintSaveDto sprintDto, @MappingTarget Sprint sprint) {
        if (sprintDto.getProjectId() != null) {
            sprint.setProject(projectRepository.getById(uuidMapper.stringToUUID(sprintDto.getProjectId())));
        }
    }
}
