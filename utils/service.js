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
  

function getAllDepartments() {
  return new Promise((resolve, reject) => {
    connection().query("SELECT * FROM department", function (err, results) {
      if (err) reject(err);
      resolve(results);
    });
  });
}

function addDepartment(name, callback) {
    const INSERT_QUERY = `INSERT INTO department SET ?`;
    connection().query(
      INSERT_QUERY,
      { name: name },
      (err, results) => {
        if (err) throw err;
        console.clear();
        console.log(
          `Department ${name} has been added successfully!`
        );
        callback();
      }
    );
}


function getAllRoles() {
  return new Promise((resolve, reject) => {
    connection().query(
      `SELECT roleId, title, salary, department.name from role
              JOIN department ON department.depart_id = role.department_id;
              `,
      function (err, results) {
        if (err) reject(err);
        resolve(results);
      }
    );
  });
}

function addRole(title, salary, departId, callback){
    const INSERT_QUERY = `INSERT INTO role SET ?`;
    connection().query(
      INSERT_QUERY,
      {
        title: title,
        salary: salary,
        department_id: departId,
      },
      (err, results) => {
        if (err) throw err;
        console.clear();
        console.log(`Role has been added successfully!`);
        callback();
      }
    );
}

// Get all employees
function getAllEmployee() {
  return new Promise((resolve, reject) => {
    connection().query(
      `SELECT
              employee.empId,
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
              `,

      function (err, results) {
        if (err) reject(err);
        resolve(results);
      }
    );
  });
}

function addEmployee(firstName, lastName, roleId, managerId, callback) {
    const INSERT_QUERY = `INSERT INTO employee SET ?`;
      connection().query(
        INSERT_QUERY,
        {
          first_name: firstName,
          last_name: lastName,
          role_id: roleId,
          manager_id: managerId,
        },
        (err, results) => {
          if (err) throw err;
          console.clear();
          console.log(`Employee has been added successfully!`);
          callback();
        }
      );
}
function updateRole(roleId, empId, callback){
    const UPDATE_QUERY = `UPDATE employee SET ? WHERE empId= ?`;
      connection().query(
        UPDATE_QUERY,
        [
          { 
            role_id: roleId,
          },
          empId
        ],
        (err, results) => {
          if (err) throw err;
          console.clear();
          console.log(`Employee role has been updated successfully!`);
          callback();
        }
      );
}



module.exports = {
    getAllDepartments,
    getAllEmployee,
    getAllRoles,
    addDepartment,
    addRole,
    addEmployee,
    updateRole
}