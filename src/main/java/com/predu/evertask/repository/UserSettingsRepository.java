package com.predu.evertask.repository;

import com.predu.evertask.domain.model.UserSettings;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface UserSettingsRepository extends BaseRepository<UserSettings, UUID>,
        JpaRepository<UserSettings, UUID> {
}
