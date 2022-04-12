package com.predu.evertask.domain.dto.organisation;

import lombok.Data;
import org.hibernate.validator.constraints.Length;

@Data
public class OrganisationCreateDto {

    @Length(min = 6, max = 50)
    private String name;

    private String description;
}
