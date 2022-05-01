CREATE TYPE project_methodology AS ENUM ('KANBAN', 'AGILE');

ALTER TABLE projects
    ADD COLUMN code VARCHAR(6) NOT NULL DEFAULT 'XX',
    ADD COLUMN methodology project_methodology NOT NULL DEFAULT 'KANBAN';
