ALTER TABLE projects
    ADD COLUMN owner_id UUID NOT NULL DEFAULT '00000000-0000-0000-0000-000000000000',
    ADD FOREIGN KEY (owner_id) REFERENCES users (id);

DROP TABLE IF EXISTS user_projects;
CREATE TABLE user_projects
(
    user_id    UUID REFERENCES users (id),
    project_id UUID REFERENCES projects (id),
    CONSTRAINT user_projects_pk PRIMARY KEY (user_id, project_id)
);

