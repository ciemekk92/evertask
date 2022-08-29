INSERT INTO roles (id, authority)
VALUES (gen_random_uuid(), 'ROLE_USER'),
       (gen_random_uuid(), 'ROLE_ADMIN'),
       (gen_random_uuid(), 'ROLE_PROJECT_ADMIN'),
       (gen_random_uuid(), 'ROLE_ORGANISATION_ADMIN'),
       (gen_random_uuid(), 'ROLE_UNASSIGNED_USER');