const inquirer = require("inquirer");

// View all Departments
// View all Roles
// View all Employees


inquirer
  .prompt(
     question = [
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
            ]
          }
    ]
    
)
  .then((answers) => {
    switch(answers === employeeManagementSystem){
        case "View All Employee":
            viewEmployee();
            break
        case "Add Employee":
            addEmployee();
            break
        case "Update Employee Role":
            updateEmployeeRole();
            break
        case "View All Roles":
            viewRoles();
            break
        case "Add Role":
            addRoles();
            break
        case "View All Department":
            viewDepartment();
            break
        case "Add Department":
            addDepartment();
            break
        case "Quit":
            quit();
            break        
    }
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });