INSERT INTO organisations (id, created_at, updated_at, created_by, modified_by, name, description)
VALUES ('b70946b7-4971-4a1c-bb89-2f811b759d27', '2022-08-23 09:26:16.580552 +00:00', null,
        '57191890-ff22-4386-a2ea-869c9f6a3ea8', '57191890-ff22-4386-a2ea-869c9f6a3ea8', 'Test organisation',
        'Test description');

INSERT INTO users (id, created_at, username, first_name, last_name, email, password, expired, enabled, locked, verified,
                   mfa_enabled, organisation_id)
VALUES ('e7a6949f-15fc-4a75-9512-556cf383a0a6', '2022-08-23 09:26:16.580552 +00:00', 'testuser', 'Test', 'User',
        'test_email@test.com', 'password', false, false, true, false, false, null),
       ('65b50e48-96f2-4019-9ad3-402429d15e5e', '2022-08-23 09:26:16.580552 +00:00', 'other2', 'Test2', 'User2',
        'other_email2@other.com', 'password', false, false, true, false, false, null),
       ('57191890-ff22-4386-a2ea-869c9f6a3ea8', '2022-08-23 09:26:16.580552 +00:00', 'testuser2', 'Test3', 'User3',
        'test_email2@test.com', 'password', false, false, true, false, false, 'b70946b7-4971-4a1c-bb89-2f811b759d27');

INSERT INTO user_roles (user_id, role_id)
VALUES ('e7a6949f-15fc-4a75-9512-556cf383a0a6',
        (SELECT id FROM roles WHERE authority = 'ROLE_UNASSIGNED_USER')),
       ('65b50e48-96f2-4019-9ad3-402429d15e5e',
        (SELECT id FROM roles WHERE authority = 'ROLE_UNASSIGNED_USER')),
       ('57191890-ff22-4386-a2ea-869c9f6a3ea8',
        (SELECT id FROM roles WHERE authority = 'ROLE_PROJECT_ADMIN'));

INSERT INTO projects (id, name, description, created_at, updated_at, created_by, modified_by, organisation_id, code,
                      methodology, active_sprint_id)
VALUES ('39718ff6-80cd-4163-bc5f-0fd7f0f502c3', 'Test project', 'Test description', '2022-08-23 09:26:16.580552 +00:00',
        null, '57191890-ff22-4386-a2ea-869c9f6a3ea8', '57191890-ff22-4386-a2ea-869c9f6a3ea8',
        'b70946b7-4971-4a1c-bb89-2f811b759d27', 'AGI', 'AGILE', null);

INSERT INTO sprints (id, created_at, updated_at, ordinal, description, start_date, finish_date, created_by, modified_by,
                     project_id, is_completed)
VALUES ('71e107a2-374d-48df-bdd3-008a99089c9c', '2022-08-23 09:26:16.580552 +00:00', null, 1, 'Test description',
        '2022-08-17 00:00:00.000000 +00:00', '2022-08-26 00:00:00.000000 +00:00',
        '57191890-ff22-4386-a2ea-869c9f6a3ea8', null,
        '39718ff6-80cd-4163-bc5f-0fd7f0f502c3', false);
