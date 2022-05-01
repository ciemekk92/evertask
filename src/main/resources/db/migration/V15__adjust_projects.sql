ALTER TABLE projects
    DROP COLUMN IF EXISTS owner_id;

ALTER TABLE projects
    DROP CONSTRAINT IF EXISTS projects_owner_id_fkey;