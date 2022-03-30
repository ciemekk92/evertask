ALTER TABLE users
    ADD COLUMN refresh_token             VARCHAR(32),
    ADD COLUMN refresh_token_expiry_date TIMESTAMP WITH TIME ZONE;