ALTER TABLE project_admins
    DROP CONSTRAINT IF EXISTS project_admins_user_id_fkey,
    DROP CONSTRAINT IF EXISTS project_admins_user_id_key;