SELECT
employee.first_name as FirstName,
employee.last_name as LastName,
role.title as Title,
role.salary as Salary,
department.name as Department,
CONCAT(manager.first_name, " " ,manager.last_name) as Manager
FROM
employee
JOIN role ON employee.role_id = role.roleId
JOIN department ON role.department_id = department.depart_id
LEFT OUTER JOIN employee manager on manager.empId = employee.manager_id