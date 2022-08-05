package com.predu.evertask.domain.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.security.core.GrantedAuthority;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Getter
@Setter
@Entity
@NoArgsConstructor
@Table(name = "roles")
public class Role implements GrantedAuthority {

    public static final String ROLE_ADMIN = "ROLE_ADMIN";
    public static final String ROLE_USER = "ROLE_USER";
    public static final String ROLE_UNASSIGNED_USER = "ROLE_UNASSIGNED_USER";
    public static final String ROLE_ORGANISATION_ADMIN = "ROLE_ORGANISATION_ADMIN";
    public static final String ROLE_PROJECT_ADMIN = "ROLE_PROJECT_ADMIN";
    public static final String ROLE_PRE_VERIFICATION_USER = "ROLE_PRE_VERIFICATION_USER";

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    private UUID id;
    private String authority;

    @ManyToMany(mappedBy = "authorities")
    private Set<User> users = new HashSet<>();

    public Role(String authority) {
        this.authority = authority;
    }
}
