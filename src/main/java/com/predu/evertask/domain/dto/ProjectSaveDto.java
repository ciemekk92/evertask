package com.predu.evertask.domain.dto;

import com.predu.evertask.domain.model.Project;
import lombok.Data;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotBlank;

@Data
public class ProjectSaveDto {

    @Length(min = 3, max = 30)
    private String name;

    @NotBlank
    private String description;

    public Project toProject() {
        var result = new Project();
        result.setDescription(description);
        result.setName(name);

        return result;
    }
}