package com.predu.evertask.domain.mapper;

import com.predu.evertask.domain.dto.organisation.OrganisationCreateDto;
import com.predu.evertask.domain.dto.organisation.OrganisationDto;
import com.predu.evertask.domain.dto.organisation.OrganisationInfoDto;
import com.predu.evertask.domain.model.Organisation;
import com.predu.evertask.repository.OrganisationRepository;
import org.mapstruct.*;
import org.springframework.beans.factory.annotation.Autowired;

@Mapper(uses = {UUIDMapper.class, ImageMapper.class}, componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public abstract class OrganisationMapper {

    @Autowired
    protected OrganisationRepository organisationRepository;

    @Autowired
    protected UserViewMapper userViewMapper;

    @Autowired
    protected ProjectMapper projectMapper;

    @Mapping(target = "members", ignore = true)
    @Mapping(target = "projects", ignore = true)
    public abstract Organisation organisationDtoToOrganisation(OrganisationDto organisationDto);

    @InheritInverseConfiguration(name = "organisationDtoToOrganisation")
    public abstract OrganisationDto organisationToOrganisationDto(Organisation organisation);

    @Mapping(target = "members", ignore = true)
    @Mapping(target = "projects", ignore = true)
    public abstract Organisation organisationCreateDtoToOrganisation(OrganisationCreateDto organisationCreateDto);

    public abstract OrganisationInfoDto organisationToOrganisationInfoDto(Organisation organisation);

    @AfterMapping
    public void afterOrganisationToOrganisationDto(Organisation source, @MappingTarget OrganisationDto target) {
        target.setMembers(source.getMembers()
                .stream()
                .map(userViewMapper::toUserIssueDto)
                .toList());

        target.setProjects(source.getProjects()
                .stream()
                .map(projectMapper::projectToProjectDto)
                .toList());
    }
}
