package com.predu.evertask.service;

import com.predu.evertask.domain.dto.organisation.OrganisationCreateDto;
import com.predu.evertask.domain.dto.organisation.OrganisationDto;
import com.predu.evertask.domain.mapper.OrganisationMapper;
import com.predu.evertask.domain.model.Organisation;
import com.predu.evertask.domain.model.User;
import com.predu.evertask.exception.NotFoundException;
import com.predu.evertask.repository.OrganisationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class OrganisationService {

    private final OrganisationRepository organisationRepository;
    private final OrganisationMapper organisationMapper;

    public List<OrganisationDto> findAll() {
        return organisationRepository.findAll()
                .stream()
                .map(organisationMapper::organisationToOrganisationDto)
                .collect(Collectors.toList());
    }

    public Optional<Organisation> findById(UUID id) {
        return organisationRepository.findById(id);
    }

    @Transactional
    public Organisation create(OrganisationCreateDto toSave, User user) {
        Organisation organisation = organisationMapper.organisationCreateDtoToOrganisation(toSave);

        organisation.setOrganisationAdmins(Set.of(user));

        return organisationRepository.save(organisation);
    }

    public Organisation update(UUID id, OrganisationDto toUpdate) {
        Optional<Organisation> optionalOrganisation = organisationRepository.findById(id);

        if (optionalOrganisation.isEmpty()) {
            throw new NotFoundException("Organisation not found");
        }

        Organisation result = organisationMapper.organisationDtoToOrganisation(toUpdate);

        return organisationRepository.save(result);
    }

    public boolean existsById(UUID id) {
        return organisationRepository.existsById(id);
    }

    public void delete(Organisation toDelete) {
        organisationRepository.delete(toDelete);
    }

    public void deleteById(UUID id) {
        organisationRepository.deleteById(id);
    }
}
