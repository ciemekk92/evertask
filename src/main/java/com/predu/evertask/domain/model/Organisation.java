package com.predu.evertask.domain.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import org.hibernate.envers.AuditOverride;
import org.hibernate.envers.Audited;
import org.hibernate.envers.NotAudited;
import org.hibernate.envers.RelationTargetAuditMode;
import org.hibernate.validator.constraints.Length;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@SuperBuilder
@Entity
@Audited(targetAuditMode = RelationTargetAuditMode.NOT_AUDITED)
@AuditOverride(forClass = BaseEntity.class)
@Table(name = "organisations")
@EntityListeners(AuditingEntityListener.class)
public class Organisation extends BaseEntity {

    @Length(min = 6, max = 50)
    private String name;

    private String description;

    @OneToMany(mappedBy = "organisation")
    private List<User> members = new ArrayList<>();

    @NotAudited
    @OneToMany(mappedBy = "organisation", cascade = CascadeType.REMOVE)
    private Set<OrganisationInvitation> organisationInvitations = new HashSet<>();

    @NotAudited
    @OneToMany(cascade = CascadeType.MERGE, orphanRemoval = true)
    @JoinTable(
        name = "organisation_admins",
        joinColumns = {@JoinColumn(name = "organisation_id")},
        inverseJoinColumns = {@JoinColumn(name = "user_id", unique = true)})
    private Set<User> organisationAdmins = new HashSet<>();

    @OneToMany(mappedBy = "organisation", cascade = CascadeType.REMOVE)
    private Set<Project> projects = new HashSet<>();
}