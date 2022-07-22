DROP TABLE IF EXISTS issue_comments;

CREATE TABLE issue_comments
(
    id          UUID PRIMARY KEY         NOT NULL,
    created_at  TIMESTAMP WITH TIME ZONE NOT NULL,
    updated_at  TIMESTAMP WITH TIME ZONE,
    created_by  UUID                     NOT NULL,
    modified_by UUID,
    content     TEXT                     NOT NULL,
    issue_id    UUID                     NOT NULL,
    parent_id   UUID,
    FOREIGN KEY (issue_id) REFERENCES issues (id),
    FOREIGN KEY (parent_id) REFERENCES issue_comments (id)
)
