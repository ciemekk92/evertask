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