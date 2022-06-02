const inquirer = require("inquirer");

const svc = require("./utils/service");

function getFullName(e) {
  return `${e.FirstName} ${e.LastName}`;
}

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
    .then(async (answers) => {
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
          await addRoles();
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
  svc
    .getAllDepartments()
    .then((results) => {
      console.clear();
      console.table(results);
    })
    .catch((err) => {
      throw err;
    });
}

// View all Roles
function viewRoles() {
  svc
    .getAllRoles()
    .then((results) => {
      console.clear();
      console.table(results);
    })
    .catch((err) => {
      throw err;
    });
}

// View all Employees
function viewEmployee() {
  // use the function of get all employees
  svc
    .getAllEmployee()
    .then((results) => {
      console.clear();
      console.table(results);
    })
    .catch((err) => {
      throw err;
    });
}
// Add the Department
function addDepartment() {
  inquirer
    .prompt([
      /* Pass your questions in here */
      {
        type: "input",
        message: "What is the name of your department?",
        name: "name",
      },
    ])
    .then((answers) => {
      // Use user feedback for... whatever!!
      svc.addDepartment(answers.name, basicQuestions);
    });
}

// Add Role
async function addRoles() {
  const departments = await svc.getAllDepartments();
  inquirer
    .prompt([
      /* Pass your questions in here */
      {
        type: "input",
        message: "What is the title of your new role?",
        name: "titleRole",
      },
      {
        type: "input",
        message: "What is the salary of your new role?",
        name: "salary",
      },
      {
        type: "list",
        message: "What is the Department of your new role?",
        name: "department",
        choices: () => departments.map((d) => d.name),
      },
    ])
    .then((answers) => {
      const department = departments.find(
        (d) => d.name.toLowerCase() === answers.department.toLowerCase()
      );
      // Use user feedback for... whatever!!
      svc.addRole(
        answers.titleRole,
        answers.salary,
        department.depart_id,
        basicQuestions
      );
    });
}

// Add employee
async function addEmployee() {
  const roles = await svc.getAllRoles();
  const employees = await svc.getAllEmployee();
  inquirer
    .prompt([
      /* Pass your questions in here */
      {
        type: "input",
        message: "What is the First name of the employee?",
        name: "firstName",
      },
      {
        type: "input",
        message: "What is the Last name of the employee?",
        name: "lastName",
      },
      {
        type: "list",
        message: "What is the role of your new employee?",
        name: "role",
        choices: () => roles.map((d) => d.title),
      },
      {
        type: "list",
        message: "Who is the Manager of the employee?",
        name: "managerName",
        choices: () => ["None", ...employees.map((e) => getFullName(e))],
      },
    ])
    .then((answers) => {
      const role = roles.find(
        (d) => d.title.toLowerCase() === answers.role.toLowerCase()
      );
      const employee = employees.find((d) => {
        const name = getFullName(d);
        return name.toLowerCase() === answers.managerName.toLowerCase();
      });

      // Use user feedback for... whatever!!
      addEmployee(
        answers.firstName,
        answers.lastName,
        role.roleId,
        answers.managerName === "None" ? null : employee.empId,
        basicQuestions
      );
    });
}

async function updateEmployeeRole() {
    const roles = await svc.getAllRoles();
    const employees = await svc.getAllEmployee();
  inquirer
    .prompt([
      /* Pass your questions in here */
      {
        type: "list",
        message: "Select an employee who's role needs to be updated?",
        name: "employeeName",
        choices: employees.map((e) => getFullName(e)),
      },
      {
        type: "list",
        message: "What is the role new Role of an employee?",
        name: "role",
        choices: () => roles.map((d) => d.title),
      },
    ])
    .then((answers) => {
      const role = roles.find(
        (d) => d.title.toLowerCase() === answers.role.toLowerCase()
      );
      const employee = employees.find((d) => {
        const name = getFullName(d);
        return name.toLowerCase() === answers.employeeName.toLowerCase();
      });
      console.log(role);
      console.log(employee)
      svc.updateRole(
        role.roleId,
        employee.empId,
        basicQuestions
      );
    });
}

function quit() {
  console.log("Goodbye!");
  process.exit();
}

console.log("---------------------------------------");
console.log("          EMPLOYEE MANAGER             ");
console.log("---------------------------------------");
basicQuestions();
