ALTER TABLE issues
    ALTER COLUMN sprint_id DROP NOT NULL,
    DROP COLUMN IF EXISTS done;

ALTER TABLE sprints
    ADD COLUMN IF NOT EXISTS project_id UUID NOT NULL DEFAULT '00000000-0000-0000-0000-000000000000',
    ADD FOREIGN KEY (project_id) REFERENCES projects (id);

DROP SEQUENCE IF EXISTS sprints_ordinal_seq CASCADE;
DROP TRIGGER IF EXISTS create_project_sequences ON projects CASCADE;
DROP FUNCTION IF EXISTS create_project_sequences CASCADE;

-- Create sequences on project creation for sprints and issues

CREATE FUNCTION create_project_sequences() RETURNS trigger
    LANGUAGE plpgsql
AS
$$
begin
    execute format('create sequence if not exists project_issue_seq_%s', translate(NEW.id::text, '-', '_'));
    execute format('create sequence if not exists project_sprint_seq_%s', translate(NEW.id::text, '-', '_'));
    return NEW;
end
$$;

CREATE TRIGGER create_project_sequences
    AFTER INSERT
    ON projects
    FOR EACH ROW
EXECUTE PROCEDURE create_project_sequences();

DROP TRIGGER IF EXISTS fill_in_sprint_seq ON sprints CASCADE;
DROP TRIGGER IF EXISTS fill_in_issue_seq ON issues CASCADE;
DROP FUNCTION IF EXISTS fill_in_sprint_seq CASCADE;
DROP FUNCTION IF EXISTS fill_in_issue_seq CASCADE;

-- Apply separate sequence per project to sprints

CREATE FUNCTION fill_in_sprint_seq() RETURNS trigger
    LANGUAGE plpgsql
AS
$$
begin
    NEW.ordinal := nextval('project_sprint_seq_' || translate(NEW.project_id::text, '-', '_'));
    return NEW;
end;
$$;

CREATE TRIGGER fill_in_sprint_seq
    BEFORE INSERT
    ON sprints
    FOR EACH ROW
EXECUTE PROCEDURE fill_in_sprint_seq();

-- Apply separate sequence per project to issues

CREATE FUNCTION fill_in_issue_seq() RETURNS trigger
    LANGUAGE plpgsql
AS
$$
begin
    NEW.key := nextval('project_issue_seq_' || translate(NEW.project_id::text, '-', '_'));
    return NEW;
end;
$$;

CREATE TRIGGER fill_in_issue_seq
    BEFORE INSERT
    ON issues
    FOR EACH ROW
EXECUTE PROCEDURE fill_in_issue_seq();
