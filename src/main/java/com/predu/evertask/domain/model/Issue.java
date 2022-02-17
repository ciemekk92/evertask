package com.predu.evertask.domain.model;

import com.predu.evertask.domain.enums.IssuePriority;
import com.predu.evertask.domain.enums.IssueStatus;
import com.predu.evertask.domain.enums.IssueType;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@Table(name = "issues")
@Entity
public class Issue extends BaseEntity {

    private int key;

    @Length(min = 6, max = 50)
    private String title;

    @Column(name = "hidden", nullable = false)
    private boolean hidden = false;

    @Column(name = "done", nullable = false)
    private boolean done = false;

    private int estimateStoryPoints;
    private int estimateHours;

    @Enumerated(EnumType.STRING)
    @NotNull
    private IssueStatus status;

    @Enumerated(EnumType.STRING)
    @NotNull
    private IssueType type;

    @Enumerated(EnumType.STRING)
    @NotNull
    private IssuePriority priority;

    @ManyToOne
    @JoinColumn(name = "project_id")
    private Project project;

    @ManyToOne
    @JoinColumn(name = "assignee_id")
    private User assignee;
}