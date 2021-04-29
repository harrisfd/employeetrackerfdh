const inquirer = require("inquirer")
const connection=require("./db/connection")

connection.connect(error =>{
    if(error)throw error 
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
            "add an employee", "update an employee role","exit",
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
}

function viewDepartments() {
    connection.query("SELECT * FROM department", (err, res)=>{
        if(err)throw err 
        console.table(res)
    })
}
//add view roles and view employees
function addDepartment() {
    inquirer.prompt({
        type:"input",
        name:"departmentname",
        message:"What Department Name do you want to add?"
    }).then(newname=>{
        connection.query("INSERT INTO department SET ?", {
            name:newname.departmentname
        }, (err,res)=>{
            if(err)throw err 
            console.log("department name added successfully")
        })
    })
    
}