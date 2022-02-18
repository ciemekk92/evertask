package com.predu.evertask.domain.model;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import javax.validation.constraints.Email;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Table(name = "users")
@Entity
public class User extends BaseEntity implements UserDetails, Serializable {

    @Length(min = 6)
    private String username;

    @Length(min = 8)
    private String password;

    @Email
    private String email;

    private String firstName;
    private String lastName;
    private String phoneNumber;

    private boolean locked;
    private boolean expired;
    private boolean enabled;
    private boolean verified;

    @OneToMany(mappedBy = "assignee")
    private Set<Issue> assignedIssues = new HashSet<>();

    @OneToMany(mappedBy = "reporter")
    private Set<Issue> reportedIssues = new HashSet<>();

    @ManyToMany
    @JoinTable(name = "user_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> authorities = new HashSet<>();

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
