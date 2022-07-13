package com.predu.evertask.domain.mapper;

import com.predu.evertask.domain.dto.user.UserSettingsDto;
import com.predu.evertask.domain.model.UserSettings;
import com.predu.evertask.repository.UserSettingsRepository;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.springframework.beans.factory.annotation.Autowired;

@Mapper(componentModel = "spring", uses = {UUIDMapper.class})
public abstract class UserSettingsMapper {

    @Autowired
    private UserSettingsRepository userSettingsRepository;

    public abstract UserSettings update(@MappingTarget UserSettings target,
                                        UserSettingsDto source);
}
