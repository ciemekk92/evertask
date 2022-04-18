package com.predu.evertask.domain.mapper;

import com.predu.evertask.domain.dto.organisation.OrganisationInfoDto;
import com.predu.evertask.domain.dto.organisation.OrganisationInvitationDto;
import com.predu.evertask.domain.model.OrganisationInvitation;
import com.predu.evertask.repository.OrganisationInvitationRepository;
import org.mapstruct.*;
import org.springframework.beans.factory.annotation.Autowired;

@Mapper(uses = UUIDMapper.class, componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public abstract class OrganisationInvitationMapper {

    @Autowired
    protected OrganisationInvitationRepository invitationRepository;

    @Autowired
    private OrganisationMapper organisationMapper;

    @Mapping(target = "organisation", ignore = true)
    public abstract OrganisationInvitationDto organisationInvitationToOrganisationInvitationDto(OrganisationInvitation organisation);

    @AfterMapping
    public void afterOrganisationInvitationToOrganisationInvitationDto(@MappingTarget OrganisationInvitationDto target, OrganisationInvitation source) {
        OrganisationInfoDto organisationDto = organisationMapper.organisationToOrganisationInfoDto(source.getOrganisation());
        target.setOrganisation(organisationDto);
    }
}
