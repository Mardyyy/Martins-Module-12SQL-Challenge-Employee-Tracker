INSERT INTO department (name)
VALUES ('Customer Service'),
    ('Sales'),
    ('Accounting');

INSERT INTO role (title, salary, department_id)
VALUES ('Front Desk', 50000, 1),
    ('Salesman', 75000, 2),
    ('Accountant', 100000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Melanie', 'Tie', 1, 1),
    ('Bambu', 'Tear', 2, 2),
    ('Marshall', 'Jeff', 3, 3);