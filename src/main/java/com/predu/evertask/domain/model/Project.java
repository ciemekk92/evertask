package com.predu.evertask.domain.model;

import com.predu.evertask.domain.enums.ProjectMethodology;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Type;
import org.hibernate.validator.constraints.Length;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "projects")
@EntityListeners(AuditingEntityListener.class)
public class Project extends BaseEntity {

    @Length(min = 3, max = 30)
    private String name;

    @Length(min = 2, max = 6)
    @Pattern(regexp = "^[A-ZŻŹĆĄŚĘŁÓŃ]+$")
    private String code;

    @NotBlank
    private String description;

    @Enumerated(EnumType.STRING)
    @Type(type = "enum_pgsql")
    @NotNull
    private ProjectMethodology methodology;

    @ManyToMany(mappedBy = "projects")
    private Set<User> members = new HashSet<>();

    @OneToMany(mappedBy = "project")
    private Set<Issue> issues = new HashSet<>();

    @NotNull
    @ManyToOne
    @JoinColumn(name = "organisation_id")
    private Organisation organisation;

    @OneToMany
    @JoinTable(
            name = "project_admins",
            joinColumns = {@JoinColumn(name = "project_id")},
            inverseJoinColumns = {@JoinColumn(name = "user_id", unique = true)})
    private Set<User> projectAdmins = new HashSet<>();

    public void updateFrom(Project source) {
        description = source.getDescription();
        name = source.getName();
    }
}
