ALTER TABLE users
    ADD COLUMN mfa_enabled BOOLEAN NOT NULL DEFAULT FALSE,
    ADD COLUMN secret      VARCHAR(64);

INSERT INTO roles (id, authority)
VALUES (gen_random_uuid(), 'ROLE_PRE_VERIFICATION_USER');
