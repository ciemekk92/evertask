ALTER TABLE users
    ADD CONSTRAINT username_unique UNIQUE (username),
    ADD CONSTRAINT email_unique UNIQUE (email);
