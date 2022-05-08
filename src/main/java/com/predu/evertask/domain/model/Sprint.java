package com.predu.evertask.domain.model;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Table(name = "sprints")
@Entity
@EntityListeners(AuditingEntityListener.class)
public class Sprint extends BaseEntity implements Serializable {

    private int ordinal;

    @Length(max = 1000)
    private String description;
    private Date startDate;
    private Date finishDate;

    @OneToMany(mappedBy = "sprint")
    private Set<Issue> issues = new HashSet<>();

    @NotNull
    @ManyToOne
    @JoinColumn(name = "project_id")
    private Project project;
}
