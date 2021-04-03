const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table");
const sequelize = require('./config/connection');

const employee = require('./lib/employee');

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "KARNUSrise10",
    database: "work_db",
});

// start connection to server and run necessary functions
connection.connect(function(err) {
    if (err) throw err;
    generateEmployees();
    generateDepartments();
    generateRoles();
    initMenu();
})

// sql data stored in variables so we can access
const employees = [];
const employeesId = [];
const departments = [];
const departmentsId = [];
const roles = [];
const rolesId = [];

let idInit = 0;

// function to populate the employees and employeesId array's 
function generateEmployees() {
    const query = "SELECT ID, first_name, last_name FROM employee";
    connection.query(query, (err, res) => {
        employees.splice(0, employees.length);
        employeesId.splice(0, employeesId.length);
        for (const i in res) {
            employees.push(res[i].first_name + " " + res[i].last_name);
            employeesId.push(res[i].ID)
        }
    })
}

// function to populate the departments and departmentsId array's 
function generateDepartments() {
    const query = "SELECT ID, department FROM department";
    connection.query(query, (err, res) => {
        departments.splice(0, departments.length);
        departmentsId.splice(0, departmentsId.length);
        for (const j in res) {
            departments.push(res[j].departments);
            departmentsId.push(res[j].ID)
        }
    })
}

//  function to populate the roles and rolesID array's 
function generateRoles() {
    const query = "SELECT ID, title FROM role";
    connection.query(query, (err, res) => {
        roles.splice(0, roles.length);
        rolesId.splice(0, rolesId.length);
        for (const k in res) {
            roles.push(res[k].title);
            rolesId.push(res[k].ID)
        }
    })
}

// initiates the prompts for the user on npm start and on any return to menu function
function initMenu() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "\nSelect from the following actions:",
            choices: [
                "View all employees", //Done
                "View departments", //Done
                "View roles", //Done
                "Add a new employee", //WIP
                "Add a new department",
                "Add a new role",
                "Remove an employee",
                "Remove a department",
                "Remove a role",
                "See total wages",
                "View employees by manager",
                "Update employees' role",
                "Update employees' manager",
                "Exit employee tracker", //Done
            ],
        })
        .then((answer) => {
            switch (answer.action) {
                case "View all employees":
                    viewEmp();
                    break;

                case "View departments":
                    viewDep();
                    break;

                case "View roles":
                    viewRole();
                    break;

                case "Add a new employee":
                    addEmp();
                    break;

                case "Add a new department":
                    addDep();
                    break;

                case "Add a new role":
                    addRole();
                    break;

                case "Remove an employee":
                    deleteEmp();
                    break;

                case "Remove a department":
                    deleteDep();
                    break;

                case "Remove a role":
                    deleteRole();
                    break;

                case "See total wages":
                    totalWages();
                    break;

                case "View employees by manager":
                    viewByManager();
                    break;

                case "Update employees' role":
                    updateRole();
                    break;

                case "Update employees' manager":
                    updateManager();
                    break;

                case "Exit employee tracker":
                    console.log("Goodbye!");
                    // process.exit();

                default:
                    console.log(`Invalid input: ${answer.action}`);
                    break;
            }
        });
}

function viewEmp() {
    const query = "SELECT ID * FROM employee";
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.log(res.length + ' employees in database.');
        console.table('Now viewing all employees:', res);
        initMenu();
    })
};

function viewDep() {
    const query = "SELECT * FROM department";
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.log(res.length + ' departments in database.');
        console.table('Now viewing all departments:', res);
        initMenu();
    })
};

function viewRole() {
    const query = "SELECT * FROM employee INNER JOIN role ON role.id = employee.role_id";
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.log(res.length + ' roles in database.');
        console.table('Now viewing all roles:', res);
        initMenu();
    })
};

function addEmp() {
    connection.query = "SELECT * FROM role",
        function(err, res) {
            if (err) throw err;
            inquirer
                .prompt([{
                        name: 'first_name',
                        type: 'input',
                        message: "What is the employee's first name?"
                    },
                    {
                        name: 'last_name',
                        type: 'input',
                        message: "What is the employee's last name?"
                    },
                    {
                        name: 'manager_id',
                        type: 'input',
                        message: "What is the employees' managers' ID?'"
                    },
                    {
                        name: 'role',
                        type: 'list',
                        choices: function() {
                            var roleArray = [];
                            for (let i = 0; i < roles.length; i++) {
                                roleArray.push(res[i].title);
                            }
                            return roleArray;
                        },
                        message: "What is the employee's role?"
                    }
                ]).then(function(answer) {
                    let role_id;
                    for (let l = 0; l < res.length; l++) {
                        if (res[l].title == answer.role) {
                            role_id = res[l].id;
                            console.log(role_id);
                        }
                    }
                    connection.query('INSERT INTO employee SET ?', {
                            first_name: answer.first_name,
                            last_name: answer.last_name,
                            manager_id: answer.manager_id,
                            role_id: role_id,
                        },
                        function(err) {
                            if (err) throw err;
                            console.log('Employee created, and added to database.');
                            initMenu();
                        })
                })
        }
};

function deleteEmp() {
    let deleteId = 0;
    inquirer
        .prompt([{
            name: "employee",
            type: "list",
            message: "Which employee do you want to remove?",
            choices: employees,
        }, ])
        .then((answers) => {
            for (let i = 0; i < employees.length; i++) {
                if (answers.employee == employees[i]) {
                    deleteId = employeeId[i];
                }
                const query = "DELETE FROM employee WHERE id = ?;";
                connection.query(query, [deleteId], (err, res) => {
                    if (err) throw err;
                });
            }
        })
        .then(() => {
            generateEmployees();
            viewEmp();
        });
}
// addDep();
// addRole();
// deleteEmp();
// deleteDep();
// deleteRole();
// totalWages();
// viewByManager();
// updateRole();
// updateManager();
// exit();