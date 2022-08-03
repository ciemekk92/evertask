package com.predu.evertask.domain.model;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.envers.*;
import org.hibernate.validator.constraints.Length;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.*;

@Getter
@Setter
@Table(name = "sprints")
@Audited
@AuditOverride(forClass = BaseEntity.class)
@Entity
@EntityListeners(AuditingEntityListener.class)
public class Sprint extends BaseEntity implements Serializable {

    @NotAudited
    private Integer ordinal;

    @Length(max = 1000)
    private String description;
    private Date startDate;
    private Date finishDate;

    @Column(name = "is_completed")
    @NotNull
    private boolean completed = false;

    @OneToMany(mappedBy = "sprint")
    @AuditMappedBy(mappedBy = "sprint")
    private List<Issue> issues = new ArrayList<>();

    @NotNull
    @ManyToOne
    @JoinColumn(name = "project_id")
    private Project project;
}
