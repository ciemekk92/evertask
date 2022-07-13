CREATE TYPE interface_language AS ENUM ('EN', 'PL');

DROP TABLE IF EXISTS user_settings;

CREATE TABLE user_settings
(
    id                 UUID PRIMARY KEY           NOT NULL,
    created_at         TIMESTAMP WITH TIME ZONE   NOT NULL,
    updated_at         TIMESTAMP WITH TIME ZONE,
    dark_mode          BOOL                       NOT NULL,
    interface_language interface_language         NOT NULL DEFAULT 'EN',
    interface_color    VARCHAR(7)                 NOT NULL DEFAULT '#3F51B5',
    user_id            UUID REFERENCES users (id) NOT NULL
);


ALTER TABLE users
    ADD COLUMN user_settings_id UUID,
    ADD FOREIGN KEY (user_settings_id) REFERENCES user_settings (id)
        ON DELETE CASCADE;

CREATE FUNCTION create_user_settings() RETURNS trigger
    LANGUAGE plpgsql
AS
$$
DECLARE
    s_id UUID;

begin
    INSERT INTO user_settings (id, created_at, dark_mode, interface_language, interface_color, user_id)
    VALUES (gen_random_uuid(), current_timestamp, false, 'EN', '#3F51B5', NEW.id)
    RETURNING id INTO s_id;

    UPDATE users SET user_settings_id = s_id WHERE id = NEW.id;

    return NEW;
end
$$;

CREATE TRIGGER create_user_settings
    AFTER INSERT
    ON users
    FOR EACH ROW
EXECUTE PROCEDURE create_user_settings();
