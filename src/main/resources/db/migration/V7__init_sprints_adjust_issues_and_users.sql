DROP TABLE IF EXISTS sprints;
CREATE TABLE sprints
(
    id          UUID PRIMARY KEY         NOT NULL,
    created_at  TIMESTAMP WITH TIME ZONE NOT NULL,
    updated_at  TIMESTAMP WITH TIME ZONE,
    ordinal     SERIAL                   NOT NULL,
    description TEXT,
    start_date  TIMESTAMP WITH TIME ZONE NOT NULL,
    finish_date TIMESTAMP WITH TIME ZONE NOT NULL
);

ALTER TABLE issues
    ADD COLUMN pull_request_url VARCHAR(150);
ALTER TABLE issues
    ADD COLUMN parent_id UUID;
ALTER TABLE issues
    ADD COLUMN reporter_id UUID NOT NULL DEFAULT '00000000-0000-0000-0000-000000000000';
ALTER TABLE issues
    ADD COLUMN sprint_id UUID NOT NULL DEFAULT '00000000-0000-0000-0000-000000000000';

ALTER TABLE issues
    ADD FOREIGN KEY (parent_id) REFERENCES issues (id);
ALTER TABLE issues
    ADD FOREIGN KEY (reporter_id) REFERENCES users (id);
ALTER TABLE issues
    ADD FOREIGN KEY (sprint_id) REFERENCES sprints (id);
