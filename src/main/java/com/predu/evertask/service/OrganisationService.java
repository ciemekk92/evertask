package com.predu.evertask.service;

import com.predu.evertask.domain.dto.organisation.OrganisationCreateDto;
import com.predu.evertask.domain.dto.organisation.OrganisationDto;
import com.predu.evertask.domain.mapper.OrganisationMapper;
import com.predu.evertask.domain.model.Organisation;
import com.predu.evertask.domain.model.Role;
import com.predu.evertask.domain.model.User;
import com.predu.evertask.exception.NotFoundException;
import com.predu.evertask.repository.OrganisationRepository;
import com.predu.evertask.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class OrganisationService {

    private final OrganisationRepository organisationRepository;
    private final OrganisationMapper organisationMapper;
    private final UserRepository userRepository;
    private final RoleService roleService;

    public List<OrganisationDto> findAll() {
        return organisationRepository.findAll()
                .stream()
                .map(organisationMapper::organisationToOrganisationDto)
                .toList();
    }

    public Optional<Organisation> findById(UUID id) {
        return organisationRepository.findById(id);
    }

    @Transactional
    public OrganisationDto getUserOrganisation(UUID id) {
        User user = userRepository.getById(id);

        return organisationMapper.organisationToOrganisationDto(user.getOrganisation());
    }

    @Transactional
    public Organisation create(OrganisationCreateDto toSave, User user) {
        Organisation organisation = organisationMapper.organisationCreateDtoToOrganisation(toSave);

        organisation.setOrganisationAdmins(Set.of(user));

        organisation = organisationRepository.save(organisation);

        User changedUser = user;

        if (user.getAuthorities().stream().noneMatch(role -> role.getAuthority().equals(Role.ROLE_ADMIN))) {
            changedUser = roleService.addRoleToUser(changedUser.getId(), Role.ROLE_ORGANISATION_ADMIN);
            changedUser = roleService.removeRoleFromUser(changedUser.getId(), Role.ROLE_UNASSIGNED_USER);
        }

        changedUser.setOrganisation(organisation);
        roleService.persistUser(changedUser);

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
