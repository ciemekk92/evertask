INSERT INTO roles (id, authority)
VALUES (gen_random_uuid(), 'ROLE_UNASSIGNED_USER');

DROP TABLE IF EXISTS organisation_invitations;
CREATE TABLE organisation_invitations
(
    id              UUID PRIMARY KEY         NOT NULL,
    created_at      TIMESTAMP WITH TIME ZONE NOT NULL,
    updated_at      TIMESTAMP WITH TIME ZONE,
    created_by      UUID                     NOT NULL,
    modified_by     UUID,
    user_id         UUID                     NOT NULL,
    organisation_id UUID                     NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (organisation_id) REFERENCES organisations (id)
)