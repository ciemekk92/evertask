package com.predu.evertask.domain.mapper;

import com.predu.evertask.domain.dto.SprintSaveDto;
import com.predu.evertask.domain.model.Sprint;
import com.predu.evertask.service.SprintService;
import org.mapstruct.*;
import org.springframework.beans.factory.annotation.Autowired;

@Mapper(uses = UUIDMapper.class, componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public abstract class SprintMapper {

    @Autowired
    private SprintService sprintService;

    @Mapping(target = "issues", ignore = true)
    @Mapping(target = "ordinal", ignore = true)
    public abstract Sprint sprintSaveDtoToSprint(SprintSaveDto sprintSaveDto);

    @InheritInverseConfiguration(name = "sprintSaveDtoToSprint")
    public abstract SprintSaveDto sprintToSprintSaveDto(Sprint sprint);
}
