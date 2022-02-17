package com.predu.evertask.domain.model;

import lombok.*;
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

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    public static final String USER_ADMIN = "USER_ADMIN";

    private String authority;

    @ManyToMany(mappedBy = "authorities")
    private Set<User> users = new HashSet<>();

    public Role(String authority) {
        this.authority = authority;
    }
}
