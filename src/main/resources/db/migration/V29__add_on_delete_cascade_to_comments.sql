ALTER TABLE issue_comments
    DROP CONSTRAINT issue_comments_parent_id_fkey,
    ADD CONSTRAINT issue_comments_parent_id_fkey
        FOREIGN KEY (parent_id)
            REFERENCES issue_comments (id)
            ON DELETE CASCADE;
