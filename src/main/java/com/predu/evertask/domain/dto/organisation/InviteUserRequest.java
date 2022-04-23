package com.predu.evertask.domain.dto.organisation;

import lombok.Data;

import javax.validation.constraints.NotNull;
import java.util.UUID;

@Data
public class InviteUserRequest {

    @NotNull
    private UUID userId;
}
