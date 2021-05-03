const inquirer = require("inquirer")
const connection = require("./db/connection")

connection.connect(error => {
    if (error) throw error
    console.log("connected to mysql")
    init()

})

function init() {
    inquirer.prompt({
        type: "list",
        name: "selection",
        message: "Please Select From the Following Options:",
        choices: [
            "view all departments", "view all roles", "view all employees", "add a department", "add a role",
            "add an employee", "update an employee role", "exit",
        ]
    }).then(answer => {
        console.log(answer.selection)
        switch (answer.selection) {
            case "view all departments":
                viewDepartments()
                break;
            case "view all roles":
                viewRoles()
                break;
            case "view all employees":
                viewEmployees()
                break;
            case "add a department":
                addDepartment()
                break;
            case "add a role":
                addRole()
                break;
            case "add an employee":
                addEmployee()
                break;
            case "update an employee role":
                updateEmployeerole()
                break;
            case "exit":
                connection.end()
                break;
            default:
                break;
        }
    })
    //add view roles and view employees
}

function viewDepartments() {
    connection.query("SELECT * FROM department", (err, res) => {
        if (err) throw err
        console.table(res)
        init()
    })
}
function viewRoles() {
    connection.query("SELECT * FROM role", (err, res) => {
        if (err) throw err
        console.table(res)
        init()
    })
}
function viewEmployees() {
    connection.query("SELECT * FROM employee", (err, res) => {
        if (err) throw err
        console.table(res)
        init()
    })
}

function addDepartment() {
    inquirer.prompt({
        type: "input",
        name: "departmentname",
        message: "What Department Name do you want to add?"
    }).then(newname => {
        connection.query("INSERT INTO department SET ?", {
            name: newname.departmentname
        }, (err, res) => {
            if (err) throw err
            console.log("department name added successfully")
            init()
        })
    })

}

function addRole() {
    connection.query("SELECT * FROM department", (err, res) => {
        inquirer.prompt([{
            type: "input",
            name: "rolename",
            message: "What Role Name do you want to add?"
        },
        {
            type: "input",
            name: "salaryinput",
            message: "What is the Salary of your Role?"
        },
        {
            type: "list",
            name: "departmentselection",
            message: "What is the Department this role belongs to?",
            choices: res
        }
        ]).then(newname => {


            const depobj = res.find(department => department.name === newname.departmentselection)
            console.log(depobj)
            connection.query("INSERT INTO role SET ?", {
                title: newname.rolename,
                salary: newname.salaryinput,
                department_id: depobj.id
            }, (err, res) => {
                if (err) throw err
                console.log("Role added successfully")
                init()
            })
        })
    })
}

function addEmployee() {
    connection.query("SELECT id, CONCAT(first_name,' ', last_name) AS name FROM employee", (err, emplres) => {
        connection.query("SELECT id,title AS name FROM role", (err, roleres) => {
            inquirer.prompt([{
                type: "input",
                name: "firstname",
                message: "What is the first name?"
            },
            {
                type: "input",
                name: "lastname",
                message: "What is the last name?"
            },
            {
                type: "list",
                name: "roleselection",
                message: "What is the Role name?",
                choices: roleres
            },
            {
                type: "list",
                name: "deptmanager",
                message: "What is the manager's name?",
                choices: emplres
            }
            ]).then(newname => {


                const roleobj = roleres.find(role => role.name === newname.roleselection)
                const empobj = emplres.find(employee => employee.name === newname.deptmanager)


                connection.query("INSERT INTO employee SET ?", {
                    first_name: newname.firstname,
                    last_name: newname.lastname,
                    role_id: roleobj.id,
                    manager_id: empobj.id
                }, (err, res) => {
                    if (err) throw err
                    console.log("Employee added successfully")
                    init()
                })
            })
        })
    })
}
//which employee do you want to update and what is the employee's new role?
function updateEmployeerole() {
    connection.query("SELECT id, CONCAT(first_name,' ', last_name) AS name FROM employee", (err, emplres) => {
        connection.query("SELECT id,title AS name FROM role", (err, roleres) => {
            inquirer.prompt([
                {
                    type: "list",
                    name: "roleid",
                    message: "What is the Employee you want to update?",
                    choices: emplres
                },
                {
                    type: "list",
                    name: "roleselection",
                    message: "What is the Role name?",
                    choices: roleres
                },


            ]).then(newname => {

                //objects with id and name properties
                const roleobj = roleres.find(role => role.name === newname.roleselection)
                const empobj = emplres.find(employee => employee.name === newname.roleid)


                connection.query("UPDATE employee SET ? WHERE ?", [{

                    role_id: roleobj.id,

                }, {
                    id: empobj.id
                }], (err, res) => {
                    if (err) throw err
                    console.log("Employee added successfully")
                    init()
                })
            })
        })
    })
}