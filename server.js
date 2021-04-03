const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table");
const sequelize = require('./config/connection');

const employee = require('./lib/employee');
const { exit } = require("node:process");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "KARNUSrise10",
    database: "work_db",
});

connection.connect(function(err) {
    if (err) throw err;
    init();
})

function init() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "Select from the following actions:",
            choices: [
                "View all employees",
                "View departments",
                "View roles",
                "Add a new employee",
                "Add a new department",
                "Add a new role",
                "Remove an employee",
                "Remove a department",
                "Remove a role",
                "See total wages",
                "View employees by manager",
                "Update employees' role",
                "Update employees' manager",
                "Exit employee tracker",
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
                    process.exit();

                default:
                    console.log(`Invalid input: ${answer.action}`);
                    break;
            }
        });
}

viewEmp();
viewDep();
viewRole();
addEmp();
addDep();
addRole();
deleteEmp();
deleteDep();
deleteRole();
totalWages();
viewByManager();
updateRole();
updateManager();
exit();