const inquirer = require("inquirer");

// Import and require mysql2

const mysql = require("mysql2");

const connection = () => {
  const db = mysql.createConnection(
    {
      host: "localhost",
      // MySQL username,
      user: "root",
      // MySQL password
      password: "Sajjad90*",
      database: "employee_management_db",
    },
    console.log(`Connected to the employee_management_db database.`)
  );
  return db;
};

const basicQuestions = () => {
  inquirer
    .prompt(
      (question = [
        {
          type: "list",
          name: "employeeManagementSystem",
          message: "What would you like to do?",
          choices: [
            "View All Employee",
            "Add Employee",
            "Update Employee Role",
            "View All Roles",
            "Add Role",
            "View All Department",
            "Add Department",
            "Quit",
          ],
        },
      ])
    )
    .then((answers) => {
      switch (answers.employeeManagementSystem) {
        case "View All Employee":
          viewEmployee();
          basicQuestions();
          break;
        case "Add Employee":
          addEmployee();
          break;
        case "Update Employee Role":
          updateEmployeeRole();
          break;
        case "View All Roles":
          viewRoles();
          basicQuestions();
          break;
        case "Add Role":
          addRoles();
          break;
        case "View All Department":
          viewDepartment();
          basicQuestions();
          break;
        case "Add Department":
          addDepartment();
          break;
        case "Quit":
          quit();
          break;
      }
    })
    .catch((error) => {
      if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
      } else {
        // Something else went wrong
      }
    });
};

// View all Departments
function viewDepartment() {
  connection().query("SELECT * FROM department", function (err, results) {
    if (err) throw err;
    console.clear();
    console.table(results);
  });
}
// View all Roles
function viewRoles() {
    connection().query(`SELECT roleId, title, salary, department.name from role
    JOIN department ON department.depart_id = role.department_id;
    `, function (err, results) {
        if (err) throw err;
        console.clear();
        console.table(results);
    });    
}
// View all Employees
function viewEmployee() {
    connection().query(`SELECT
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
    `, function (err, results) {
        if (err) throw err;
        console.clear();
        console.table(results);
    });    
}
basicQuestions();
