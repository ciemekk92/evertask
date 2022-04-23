DROP TABLE IF EXISTS organisations;
CREATE TABLE organisations
(
    id          UUID PRIMARY KEY         NOT NULL,
    created_at  TIMESTAMP WITH TIME ZONE NOT NULL,
    updated_at  TIMESTAMP WITH TIME ZONE,
    created_by  UUID                     NOT NULL,
    modified_by UUID,
    name        VARCHAR(50)              NOT NULL,
    description TEXT
);

DROP TABLE IF EXISTS organisation_admins;
CREATE TABLE organisation_admins
(
    organisation_id UUID REFERENCES organisations (id),
    user_id         UUID REFERENCES users (id) UNIQUE,
    CONSTRAINT organisation_admins_pk PRIMARY KEY (organisation_id, user_id)
);

DROP TABLE IF EXISTS project_admins;
CREATE TABLE project_admins
(
    project_id UUID REFERENCES projects (id),
    user_id    UUID REFERENCES users (id) UNIQUE,
    CONSTRAINT project_admins_pk PRIMARY KEY (project_id, user_id)
);

ALTER TABLE projects
    ADD COLUMN organisation_id UUID NOT NULL DEFAULT '00000000-0000-0000-0000-000000000000',
    ADD FOREIGN KEY (organisation_id) REFERENCES organisations (id);

ALTER TABLE users
    ADD COLUMN organisation_id UUID,
    ADD FOREIGN KEY (organisation_id) REFERENCES organisations (id);

INSERT INTO roles (id, authority)
VALUES (gen_random_uuid(), 'ROLE_USER'),
       (gen_random_uuid(), 'ROLE_ADMIN'),
       (gen_random_uuid(), 'ROLE_PROJECT_ADMIN'),
       (gen_random_uuid(), 'ROLE_ORGANISATION_ADMIN');