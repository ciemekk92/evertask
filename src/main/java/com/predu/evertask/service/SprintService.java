package com.predu.evertask.service;

import com.predu.evertask.domain.model.Sprint;
import com.predu.evertask.repository.SprintRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class SprintService {

    private final SprintRepository sprintRepository;

    public SprintService(SprintRepository sprintRepository) {
        this.sprintRepository = sprintRepository;
    }

    public List<Sprint> findAll() {
        return sprintRepository.findAll();
    }

    public Optional<Sprint> findById(UUID id) {
        return sprintRepository.findById(id);
    }

    public Sprint save(Sprint toSave) {
        return sprintRepository.save(toSave);
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
