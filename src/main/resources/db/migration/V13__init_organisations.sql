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

CREATE TABLE user_organisations
(
    user_id         UUID REFERENCES users (id),
    organisation_id UUID REFERENCES organisations (id),
    CONSTRAINT user_organisations_pk PRIMARY KEY (user_id, organisation_id)
);

ALTER TABLE projects
    ADD COLUMN organisation_id UUID NOT NULL DEFAULT '00000000-0000-0000-0000-000000000000',
    ADD FOREIGN KEY (organisation_id) REFERENCES organisations (id);