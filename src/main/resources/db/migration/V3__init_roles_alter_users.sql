DROP TABLE IF EXISTS roles;
CREATE TABLE roles
(
    id        UUID PRIMARY KEY NOT NULL,
    authority VARCHAR(50)      NOT NULL
);

CREATE TABLE user_roles
(
    user_id UUID REFERENCES users (id),
    role_id UUID REFERENCES roles (id),
    CONSTRAINT user_roles_pk PRIMARY KEY (user_id, role_id)
)