const mysql=require("mysql")

const connection=mysql.createConnection({
    host:"localhost",
    user:"root",
    database:"employeedb",
    password:"password"

})

module.exports=connection