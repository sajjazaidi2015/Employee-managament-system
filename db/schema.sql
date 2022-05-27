DROP DATABASE IF EXISTS employee_management_db;
CREATE DATABASE employee_management_db;

USE employee_management_db;

CREATE TABLE department (
department_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(30)
);

CREATE TABLE role (
roleId INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(30),
salary DECIMAL(5,2),
role_id INT,
FOREIGN KEY (role_id)
REFERENCES department(department_id)
ON DELETE SET NULL
);

CREATE TABLE employee (
empId INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
first_name VARCHAR(30),
last_name VARCHAR(30),
role_id INT NULL,
manager_id INT NULL,
FOREIGN KEY (role_id) REFERENCES role(roleId),
FOREIGN KEY (manager_id) REFERENCES employee(empId)
ON DELETE SET NULL
);