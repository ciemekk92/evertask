package com.predu.evertask.repository;

import com.predu.evertask.domain.model.Image;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface ImageRepository extends BaseRepository<Image, UUID>,
        JpaRepository<Image, UUID> {

    Optional<Image> findByName(String name);
}
