package com.predu.evertask.domain.model;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "organisations")
@EntityListeners(AuditingEntityListener.class)
public class Organisation extends BaseEntity {

    @Length(min = 6, max = 50)
    private String name;

    private String description;

    @OneToMany(mappedBy = "organisation")
    private Set<User> members = new HashSet<>();

    @OneToMany(mappedBy = "organisation", cascade = CascadeType.REMOVE)
    private Set<OrganisationInvitation> organisationInvitations = new HashSet<>();

    @OneToMany(cascade = CascadeType.MERGE, orphanRemoval = true)
    @JoinTable(
        name = "organisation_admins",
        joinColumns = {@JoinColumn(name = "organisation_id")},
        inverseJoinColumns = {@JoinColumn(name = "user_id", unique = true)})
    private Set<User> organisationAdmins = new HashSet<>();

    @OneToMany(mappedBy = "organisation", cascade = CascadeType.REMOVE)
    private Set<Project> projects = new HashSet<>();
}