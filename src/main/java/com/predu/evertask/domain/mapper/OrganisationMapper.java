package com.predu.evertask.domain.mapper;

import com.predu.evertask.domain.dto.organisation.OrganisationCreateDto;
import com.predu.evertask.domain.dto.organisation.OrganisationDto;
import com.predu.evertask.domain.dto.organisation.OrganisationInfoDto;
import com.predu.evertask.domain.model.Organisation;
import com.predu.evertask.repository.OrganisationRepository;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;
import org.springframework.beans.factory.annotation.Autowired;

@Mapper(uses = UUIDMapper.class, componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public abstract class OrganisationMapper {

    @Autowired
    protected OrganisationRepository organisationRepository;

    @Mapping(target = "members", ignore = true)
    @Mapping(target = "projects", ignore = true)
    public abstract Organisation organisationDtoToOrganisation(OrganisationDto organisationDto);

    @InheritInverseConfiguration(name = "organisationDtoToOrganisation")
    public abstract OrganisationDto organisationToOrganisationDto(Organisation organisation);

    @Mapping(target = "members", ignore = true)
    @Mapping(target = "projects", ignore = true)
    public abstract Organisation organisationCreateDtoToOrganisation(OrganisationCreateDto organisationCreateDto);

    public abstract OrganisationInfoDto organisationToOrganisationInfoDto(Organisation organisation);
}
