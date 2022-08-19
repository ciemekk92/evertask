package com.predu.evertask.domain.mapper;

import com.predu.evertask.domain.dto.auth.CreateUserRequest;
import com.predu.evertask.domain.dto.user.UserDetailsUpdateDto;
import com.predu.evertask.domain.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", uses = UUIDMapper.class, unmappedTargetPolicy = ReportingPolicy.IGNORE)
public abstract class UserEditMapper {

    @Mapping(target = "authorities", ignore = true)
    public abstract User create(CreateUserRequest request);

    public abstract void updateDetails(UserDetailsUpdateDto source, @MappingTarget User user);
}
