DROP TABLE IF EXISTS verification_tokens;
CREATE TABLE verification_tokens
(
    id          UUID PRIMARY KEY         NOT NULL,
    token       VARCHAR(100)             NOT NULL,
    expiry_date TIMESTAMP WITH TIME ZONE NOT NULL,
    user_id     UUID                     NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id)
);
