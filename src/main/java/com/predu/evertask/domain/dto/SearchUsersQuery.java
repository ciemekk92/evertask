package com.predu.evertask.domain.dto;


import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
public class SearchUsersQuery {

    private UUID id;
    private String username;
}
