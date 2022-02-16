DROP TABLE IF EXISTS users;
CREATE TABLE users
(
    id           UUID PRIMARY KEY         NOT NULL,
    created_at   TIMESTAMP WITH TIME ZONE NOT NULL,
    updated_at   TIMESTAMP WITH TIME ZONE NOT NULL,
    username     VARCHAR(30)              NOT NULL,
    password     VARCHAR(30)              NOT NULL,
    email        VARCHAR(60)              NOT NULL,
    first_name   VARCHAR(30)              NOT NULL,
    last_name    VARCHAR(30)              NOT NULL,
    phone_number VARCHAR(15),
    locked       BOOLEAN                  NOT NULL DEFAULT FALSE,
    expired      BOOLEAN                  NOT NULL DEFAULT FALSE,
    enabled      BOOLEAN                  NOT NULL DEFAULT TRUE,
    verified     BOOLEAN                  NOT NULL DEFAULT FALSE
)