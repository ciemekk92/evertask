package com.predu.evertask.domain.model;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Generated;
import org.hibernate.annotations.GenerationTime;
import org.hibernate.validator.constraints.Length;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.io.Serializable;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Table(name = "sprints")
@Entity
public class Sprint extends BaseEntity implements Serializable {

    @Generated(GenerationTime.INSERT)
    private int ordinal;

    @Length(max = 1000)
    private String description;
    private Date startDate;
    private Date finishDate;

    @OneToMany(mappedBy = "sprint")
    private Set<Issue> issues = new HashSet<>();
}
