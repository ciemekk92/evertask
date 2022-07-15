package com.predu.evertask.domain.model;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.Instant;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Getter
@Setter
@Table(name = "users")
@Entity
public class User implements UserDetails, Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="id", insertable = false, updatable = false, nullable = false)
    private UUID id;

    private Date createdAt;
    private Date updatedAt;

    @Length(min = 6)
    private String username;

    @Length(min = 8)
    private String password;

    @Email
    @Length(max = 60)
    private String email;

    @Length(max = 30)
    private String firstName;

    @Length(max = 30)
    private String lastName;

    @Length(max = 30)
    private String phoneNumber;

    private String bio;
    private String refreshToken;
    private Date refreshTokenExpiryDate;

    private boolean locked;
    private boolean expired;
    private boolean enabled;
    private boolean verified;

    @NotNull
    private boolean mfaEnabled;

    private String secret;

    @OneToOne
    @JoinColumn(name = "user_settings_id")
    private UserSettings userSettings;

    @ManyToOne
    @JoinColumn(name = "avatar_id")
    private Image avatar;

    @OneToMany(mappedBy = "assignee")
    private Set<Issue> assignedIssues = new HashSet<>();

    @OneToMany(mappedBy = "reporter")
    private Set<Issue> reportedIssues = new HashSet<>();

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "user_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> authorities = new HashSet<>();

    @ManyToOne
    @JoinColumn(name = "organisation_id")
    private Organisation organisation;

    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE)
    private Set<OrganisationInvitation> organisationInvitations = new HashSet<>();

    @ManyToMany
    @JoinTable(name = "user_projects",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "project_id"))
    private Set<Project> projects = new HashSet<>();

    @Override
    public boolean isAccountNonExpired() {
        return enabled;
    }

    @Override
    public boolean isAccountNonLocked() {
        return enabled;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return enabled;
    }

    @PrePersist
    void prePersist() {
        createdAt = Date.from(Instant.now());
    }

    @PreUpdate
    void preUpdate() {
        updatedAt = Date.from(Instant.now());
    }
}
