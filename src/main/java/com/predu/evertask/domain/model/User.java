package com.predu.evertask.domain.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.envers.Audited;
import org.hibernate.envers.NotAudited;
import org.hibernate.envers.RelationTargetAuditMode;
import org.hibernate.validator.constraints.Length;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.OffsetDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@SuperBuilder
@Table(name = "users")
@Audited(targetAuditMode = RelationTargetAuditMode.NOT_AUDITED)
@EntityListeners(AuditingEntityListener.class)
@Entity
public class User implements UserDetails, Serializable {

    public User(UUID id, String username, String firstName, Set<Role> authorities) {
        this.id = id;
        this.username = username;
        this.firstName = firstName;
        this.authorities = authorities;
    }

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    @Column(name = "id", insertable = false, updatable = false, nullable = false)
    private UUID id;

    @CreatedDate
    private OffsetDateTime createdAt;

    @LastModifiedDate
    private OffsetDateTime updatedAt;

    @Column(unique = true)
    @Length(min = 6)
    private String username;

    @NotAudited
    @Length(min = 8)
    private String password;

    @Column(unique = true)
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

    @NotAudited
    private String refreshToken;

    @NotAudited
    private OffsetDateTime refreshTokenExpiryDate;

    private boolean locked;
    private boolean expired;
    private boolean enabled;
    private boolean verified;

    @NotAudited
    @NotNull
    private boolean mfaEnabled;

    @NotAudited
    private String secret;

    @NotAudited
    @OneToOne
    @JoinColumn(name = "user_settings_id")
    private UserSettings userSettings;

    @NotAudited
    @ManyToOne
    @JoinColumn(name = "avatar_id")
    private Image avatar;

    @OneToMany(mappedBy = "assignee")
    private Set<Issue> assignedIssues = new HashSet<>();

    @OneToMany(mappedBy = "reporter")
    private Set<Issue> reportedIssues = new HashSet<>();

    @NotAudited
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "user_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> authorities = new HashSet<>();

    @ManyToOne
    @JoinColumn(name = "organisation_id")
    private Organisation organisation;

    @NotAudited
    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE)
    private Set<OrganisationInvitation> organisationInvitations = new HashSet<>();

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
}
