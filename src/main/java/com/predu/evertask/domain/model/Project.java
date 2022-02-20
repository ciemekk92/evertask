package com.predu.evertask.domain.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "projects")
public class Project extends BaseEntity{

    @Length(min = 3, max = 30)
    private String name;

    @NotBlank
    private String description;

    @OneToMany(mappedBy = "project")
    private Set<Issue> issues = new HashSet<>();

    public void updateFrom(Project source) {
        description = source.getDescription();
        name = source.getName();
    }
}
