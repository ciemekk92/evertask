package com.predu.evertask.service;

import com.predu.evertask.domain.dto.sprint.SprintDto;
import com.predu.evertask.domain.dto.sprint.SprintIssuesDto;
import com.predu.evertask.domain.dto.sprint.SprintSaveDto;
import com.predu.evertask.domain.dto.sprint.SprintUpdateDto;
import com.predu.evertask.domain.mapper.SprintMapper;
import com.predu.evertask.domain.model.Sprint;
import com.predu.evertask.exception.NotFoundException;
import com.predu.evertask.repository.SprintRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class SprintService {

    private final SprintRepository sprintRepository;
    private final SprintMapper sprintMapper;

    public SprintService(SprintRepository sprintRepository, SprintMapper sprintMapper) {
        this.sprintRepository = sprintRepository;
        this.sprintMapper = sprintMapper;
    }

    public List<SprintDto> findAll() {
        return sprintRepository.findAll()
                .stream()
                .map(sprintMapper::sprintToSprintDto)
                .toList();
    }

    public List<SprintDto> getProjectSprints(UUID projectId) {
        return sprintRepository.findAllByProjectIdOrderByOrdinalDesc(projectId)
                .stream()
                .map(sprintMapper::sprintToSprintDto)
                .toList();
    }

    public List<SprintIssuesDto> getProjectsNotCompletedSprints(UUID projectId) {
        return sprintRepository.findAllByProjectIdAndCompletedIsFalseOrderByOrdinalAsc(projectId)
                .stream()
                .map(sprintMapper::sprintToSprintIssuesDto)
                .toList();
    }

    public List<SprintIssuesDto> getProjectsCompletedSprints(UUID projectId) {
        return sprintRepository.findAllByProjectIdAndCompletedIsTrueOrderByOrdinalDesc(projectId)
                .stream()
                .map(sprintMapper::sprintToSprintIssuesDto)
                .toList();
    }

    public Optional<SprintDto> findById(UUID id) {
        Optional<Sprint> sprint = sprintRepository.findById(id);

        return sprint.map(sprintMapper::sprintToSprintDto);
    }

    public Sprint create(SprintSaveDto toSave) {
        return sprintRepository.save(sprintMapper.sprintSaveDtoToSprint(toSave));
    }

    public Sprint update(UUID id, SprintUpdateDto toUpdate) {
        Sprint source = sprintRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Sprint not found"));

        Sprint result = sprintMapper.update(source, toUpdate);

        return sprintRepository.save(result);
    }

    public boolean existsById(UUID id) {
        return sprintRepository.existsById(id);
    }

    public void delete(Sprint toDelete) {
        sprintRepository.delete(toDelete);
    }

    public void deleteById(UUID id) {
        sprintRepository.deleteById(id);
    }
}
