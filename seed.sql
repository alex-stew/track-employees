USE work_db;

INSERT INTO department (department_name)
VALUES 
('Web Services'),
('Cyber Security'),
('Financial Services'),
('Human Resources'),
('Software'),
('Sales');

INSERT INTO role (title, salary, department_id)
VALUES
('Web Developer', 65000, 1),
('Databaase Administrator', 80000, 2),
('Accountant', 100000, 3),
('HR Consulatant', 60000, 4),
('Engineer', 120000, 5),
('Sales Rep', 180000, 6);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
('Michelle', 'Aggletom', 1, 399),
('Ron', 'Wick', 2, 283),
('Debbie', 'Lichtenstien', 3, 222),
('Barry', 'Hall', 4, 341),
('Joy', 'Smith', 5, 180),
('Taylor', 'Walker', 6, 181);