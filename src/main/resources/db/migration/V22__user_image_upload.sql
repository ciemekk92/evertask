ALTER TABLE users
    DROP COLUMN IF EXISTS avatar_id,
    ADD COLUMN avatar_id UUID;

DROP TABLE IF EXISTS images;

CREATE TABLE images
(
    id          UUID PRIMARY KEY         NOT NULL,
    created_at  TIMESTAMP WITH TIME ZONE NOT NULL,
    updated_at  TIMESTAMP WITH TIME ZONE,
    created_by  UUID                     NOT NULL,
    modified_by UUID,
    name        VARCHAR(100)             NOT NULL,
    type        VARCHAR(50)               NOT NULL,
    pic_byte    BYTEA                    NOT NULL
);



ALTER TABLE users
    ADD FOREIGN KEY (avatar_id) REFERENCES images (id);