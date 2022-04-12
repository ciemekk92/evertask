package com.predu.evertask.domain.dto.project;

import com.predu.evertask.domain.model.Project;
import lombok.Data;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotBlank;
import java.util.UUID;

@Data
public class ProjectCreateDto {

    @Length(min = 3, max = 30)
    private String name;

    @NotBlank
    private String description;

    private UUID ownerId;
    private UUID organisationId;

    public Project toProject() {
        var result = new Project();
        result.setDescription(description);
        result.setName(name);

        return result;
    }
}