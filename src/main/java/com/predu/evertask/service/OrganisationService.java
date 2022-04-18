package com.predu.evertask.service;

import com.predu.evertask.domain.dto.organisation.OrganisationCreateDto;
import com.predu.evertask.domain.dto.organisation.OrganisationDto;
import com.predu.evertask.domain.mapper.OrganisationMapper;
import com.predu.evertask.domain.mapper.ProjectMapper;
import com.predu.evertask.domain.mapper.UserViewMapper;
import com.predu.evertask.domain.model.Organisation;
import com.predu.evertask.domain.model.Role;
import com.predu.evertask.domain.model.User;
import com.predu.evertask.exception.NotFoundException;
import com.predu.evertask.repository.OrganisationRepository;
import com.predu.evertask.repository.RoleRepository;
import com.predu.evertask.repository.UserRepository;
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
    private final UserViewMapper userViewMapper;
    private final ProjectMapper projectMapper;
    private final RoleRepository roleRepository;
    private final UserRepository userRepository;

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
    public OrganisationDto getUserOrganisation(UUID id) {
        User user = userRepository.getById(id);

        OrganisationDto organisation = organisationMapper.organisationToOrganisationDto(user.getOrganisation());

        return organisation;
    }

    @Transactional
    public Organisation create(OrganisationCreateDto toSave, User user) {
        Organisation organisation = organisationMapper.organisationCreateDtoToOrganisation(toSave);

        organisation.setOrganisationAdmins(Set.of(user));

        organisation = organisationRepository.save(organisation);

        if (user.getAuthorities().stream().noneMatch(role -> role.getAuthority().equals(Role.ROLE_ADMIN))) {
            Role role = roleRepository.findByAuthority(Role.ROLE_ORGANISATION_ADMIN);
            user.setAuthorities(Set.of(role));
        }

        user.setOrganisation(organisation);
        userRepository.save(user);

        return organisation;
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
