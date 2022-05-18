ALTER TABLE projects
    ADD COLUMN active_sprint_id UUID,
    ADD FOREIGN KEY (active_sprint_id) REFERENCES sprints (id);
