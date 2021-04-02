-- DROP DATABASE IF EXISTS work_db; 
CREATE database work_db;

USE work_db;

CREATE TABLE department(
ID INTEGER PRIMARY KEY AUTO_INCREMENT,
department VARCHAR(30)
);

CREATE TABLE role(
ID INTEGER PRIMARY KEY AUTO_INCREMENT,
title VARCHAR(30),
salary Integer,
department_id INTEGER, 
FOREIGN key (department_id) REFERENCES department(ID)
);

CREATE TABLE employee(
ID INTEGER PRIMARY KEY AUTO_INCREMENT,
first_name VARCHAR(30),
last_name VARCHAR(30),
role_id INTEGER,
manager_id INTEGER, 
FOREIGN key (role_id) REFERENCES role(id)
);

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;