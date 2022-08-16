package com.predu.evertask.domain.model;

import com.predu.evertask.domain.enums.InterfaceLanguage;
import com.predu.evertask.util.EnumTypePgSql;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.OffsetDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.UUID;

@TypeDef(name = "enum_pgsql", typeClass = EnumTypePgSql.class)

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "user_settings")
public class UserSettings implements Serializable {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )    @Column(name = "id", insertable = false, updatable = false, nullable = false)
    private UUID id;

    @Column(updatable = false)
    private OffsetDateTime createdAt;

    private OffsetDateTime updatedAt;

    @NotNull
    private boolean darkMode;

    @NotNull
    private String interfaceColor;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Enumerated(EnumType.STRING)
    @Type(type = "enum_pgsql")
    @NotNull
    private InterfaceLanguage interfaceLanguage;

    @PrePersist
    void prePersist() {
        createdAt = OffsetDateTime.from(ZonedDateTime.now(ZoneId.systemDefault()));
    }

    @PreUpdate
    void preUpdate() {
        updatedAt = OffsetDateTime.from(ZonedDateTime.now(ZoneId.systemDefault()));
    }
}
