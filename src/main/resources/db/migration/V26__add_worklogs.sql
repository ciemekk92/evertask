DROP TABLE IF EXISTS issue_work_logs;

CREATE TABLE issue_work_logs
(
    id             UUID PRIMARY KEY         NOT NULL,
    created_at     TIMESTAMP WITH TIME ZONE NOT NULL,
    updated_at     TIMESTAMP WITH TIME ZONE,
    created_by     UUID                     NOT NULL,
    modified_by    UUID,
    reported_hours INT                      NOT NULL,
    issue_id       UUID                     NOT NULL,
    FOREIGN KEY (issue_id) REFERENCES issues (id)
)
