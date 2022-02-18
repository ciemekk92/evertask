package com.predu.evertask.domain.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.time.Instant;
import java.util.Date;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@MappedSuperclass
public class BaseEntity implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="id", insertable = false, updatable = false, nullable = false)
    private UUID id;

    private Date createdAt;
    private Date updatedAt;

    @PrePersist
    void prePersist() {
        createdAt = Date.from(Instant.now());
    }

    @PreUpdate
    void preUpdate() {
        updatedAt = Date.from(Instant.now());
    }
}
