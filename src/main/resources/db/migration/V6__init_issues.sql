CREATE TYPE issue_status AS ENUM ('TO_DO', 'ON_HOLD', 'IN_PROGRESS', 'CODE_REVIEW', 'TESTING', 'COMPLETED', 'ACCEPTED');
CREATE TYPE issue_type AS ENUM ('EPIC', 'STORY', 'BUG', 'TASK', 'SUBTASK');
CREATE TYPE issue_priority AS ENUM ('ASAP', 'VERY_HIGH', 'HIGH', 'MEDIUM', 'LOW');

DROP TABLE IF EXISTS issues;
CREATE TABLE issues
(
    id                    UUID PRIMARY KEY         NOT NULL,
    created_at            TIMESTAMP WITH TIME ZONE NOT NULL,
    updated_at            TIMESTAMP WITH TIME ZONE,
    key                   SERIAL                   NOT NULL,
    title                 VARCHAR(50)              NOT NULL,
    hidden                BOOLEAN                  NOT NULL DEFAULT FALSE,
    done                  BOOLEAN                  NOT NULL DEFAULT FALSE,
    estimate_story_points INT,
    estimate_hours        INT,
    status                issue_status,
    type                  issue_type,
    priority              issue_priority,
    project_id            UUID                     NOT NULL,
    assignee_id           UUID,
    FOREIGN KEY (project_id) REFERENCES projects (id),
    FOREIGN KEY (assignee_id) REFERENCES users (id)
);