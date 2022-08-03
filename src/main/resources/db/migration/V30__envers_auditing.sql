DO
$$
    BEGIN
        IF NOT EXISTS(
                SELECT 0 FROM pg_class WHERE relname = 'hibernate_sequence'
            ) THEN CREATE SEQUENCE hibernate_sequence
            INCREMENT 1
            MINVALUE 1
            MAXVALUE 9223372036854775807
            START 1
            CACHE 1;
        END IF;
    END;
$$;


CREATE TABLE revision_info
(
    revision_id   SERIAL PRIMARY KEY,
    rev_timestamp BIGINT      NOT NULL,
    username      VARCHAR(50) NOT NULL
);

CREATE TABLE issues_audit
(
    revision_id           INT                      NOT NULL,
    id                    UUID                     NOT NULL,
    revision_type         SMALLINT                 NOT NULL,
    created_at            TIMESTAMP WITH TIME ZONE NOT NULL,
    updated_at            TIMESTAMP WITH TIME ZONE,
    created_by            UUID                     NOT NULL,
    modified_by           UUID,
    title                 VARCHAR(50)              NOT NULL,
    hidden                BOOLEAN                  NOT NULL,
    description           TEXT                     NOT NULL,
    pull_request_url      VARCHAR(150),
    estimate_story_points INT,
    estimate_hours        INT,
    status                issue_status,
    type                  issue_type,
    priority              issue_priority,
    reporter_id           UUID                     NOT NULL,
    sprint_id             UUID,
    parent_id             UUID,
    assignee_id           UUID,
    PRIMARY KEY (revision_id, id),
    CONSTRAINT idfk_issue_revinfo_rev_id FOREIGN KEY (revision_id) REFERENCES revision_info (revision_id)
);

CREATE TABLE issue_comments_audit
(
    revision_id   INT                      NOT NULL,
    id            UUID                     NOT NULL,
    revision_type SMALLINT                 NOT NULL,
    created_at    TIMESTAMP WITH TIME ZONE NOT NULL,
    updated_at    TIMESTAMP WITH TIME ZONE,
    created_by    UUID                     NOT NULL,
    modified_by   UUID,
    content       TEXT                     NOT NULL,
    issue_id      UUID                     NOT NULL,
    parent_id     UUID,
    PRIMARY KEY (revision_id, id),
    CONSTRAINT idfk_issue_comment_revinfo_rev_id FOREIGN KEY (revision_id) REFERENCES revision_info (revision_id)
);

CREATE TABLE issue_work_logs_audit
(
    revision_id    INT                      NOT NULL,
    id             UUID                     NOT NULL,
    revision_type  SMALLINT                 NOT NULL,
    created_at     TIMESTAMP WITH TIME ZONE NOT NULL,
    updated_at     TIMESTAMP WITH TIME ZONE,
    created_by     UUID                     NOT NULL,
    modified_by    UUID,
    reported_hours INT                      NOT NULL,
    issue_id       UUID                     NOT NULL,
    PRIMARY KEY (revision_id, id),
    CONSTRAINT idfk_issue_work_log_revinfo_rev_id FOREIGN KEY (revision_id) REFERENCES revision_info (revision_id)
);

CREATE TABLE projects_audit
(
    revision_id      INT                      NOT NULL,
    id               UUID                     NOT NULL,
    revision_type    SMALLINT                 NOT NULL,
    created_at       TIMESTAMP WITH TIME ZONE NOT NULL,
    updated_at       TIMESTAMP WITH TIME ZONE,
    created_by       UUID                     NOT NULL,
    modified_by      UUID,
    code             VARCHAR(6)               NOT NULL,
    name             VARCHAR(30)              NOT NULL,
    methodology      project_methodology      NOT NULL,
    description      TEXT,
    organisation_id  UUID                     NOT NULL,
    active_sprint_id UUID,
    PRIMARY KEY (revision_id, id),
    CONSTRAINT idfk_project_revinfo_rev_id FOREIGN KEY (revision_id) REFERENCES revision_info (revision_id)
);

CREATE TABLE sprints_audit
(
    revision_id   INT                      NOT NULL,
    id            UUID                     NOT NULL,
    revision_type SMALLINT                 NOT NULL,
    created_at    TIMESTAMP WITH TIME ZONE NOT NULL,
    updated_at    TIMESTAMP WITH TIME ZONE,
    created_by    UUID                     NOT NULL,
    modified_by   UUID,
    description   TEXT,
    start_date    TIMESTAMP WITH TIME ZONE NOT NULL,
    finish_date   TIMESTAMP WITH TIME ZONE NOT NULL,
    is_completed  BOOLEAN                  NOT NULL,
    project_id    UUID                     NOT NULL,
    PRIMARY KEY (revision_id, id),
    CONSTRAINT idfk_sprint_revinfo_rev_id FOREIGN KEY (revision_id) REFERENCES revision_info (revision_id)
);

CREATE TABLE organisations_audit
(
    revision_id   INT                      NOT NULL,
    id            UUID                     NOT NULL,
    revision_type SMALLINT                 NOT NULL,
    created_at    TIMESTAMP WITH TIME ZONE NOT NULL,
    updated_at    TIMESTAMP WITH TIME ZONE,
    created_by    UUID                     NOT NULL,
    modified_by   UUID,
    name          VARCHAR(30)              NOT NULL,
    description   TEXT,
    PRIMARY KEY (revision_id, id),
    CONSTRAINT idfk_organisation_revinfo_rev_id FOREIGN KEY (revision_id) REFERENCES revision_info (revision_id)
);

CREATE TABLE users_audit
(
    revision_id     INT                      NOT NULL,
    id              UUID                     NOT NULL,
    revision_type   SMALLINT                 NOT NULL,
    created_at      TIMESTAMP WITH TIME ZONE NOT NULL,
    updated_at      TIMESTAMP WITH TIME ZONE,
    username        VARCHAR(30)              NOT NULL,
    email           VARCHAR(60)              NOT NULL,
    first_name      VARCHAR(30)              NOT NULL,
    last_name       VARCHAR(30)              NOT NULL,
    locked          BOOLEAN                  NOT NULL,
    expired         BOOLEAN                  NOT NULL,
    enabled         BOOLEAN                  NOT NULL,
    verified        BOOLEAN                  NOT NULL,
    organisation_id UUID,
    bio             TEXT,
    phone_number    VARCHAR(30),
    PRIMARY KEY (revision_id, id),
    CONSTRAINT idfk_user_revinfo_rev_id FOREIGN KEY (revision_id) REFERENCES revision_info (revision_id)
);
