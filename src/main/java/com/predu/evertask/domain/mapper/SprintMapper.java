package com.predu.evertask.domain.mapper;

import com.predu.evertask.domain.dto.sprint.SprintDto;
import com.predu.evertask.domain.dto.sprint.SprintSaveDto;
import com.predu.evertask.domain.model.Sprint;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(uses = UUIDMapper.class, componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public abstract class SprintMapper {

    @Mapping(target = "issues", ignore = true)
    @Mapping(target = "ordinal", ignore = true)
    public abstract Sprint sprintSaveDtoToSprint(SprintSaveDto sprintSaveDto);

    @InheritInverseConfiguration(name = "sprintSaveDtoToSprint")
    public abstract SprintSaveDto sprintToSprintSaveDto(Sprint sprint);

    public abstract SprintDto sprintToSprintDto(Sprint sprint);
}
