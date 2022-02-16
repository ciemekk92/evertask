package com.predu.evertask.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.Email;
import java.util.Collection;

@Getter
@Setter
@NoArgsConstructor
@Table(name = "users")
@Entity
public class User extends BaseEntity implements UserDetails {

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

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return !expired;
    }

    @Override
    public boolean isAccountNonLocked() {
        return !locked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return false;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }
}
