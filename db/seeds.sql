USE employeedb;

INSERT INTO department(name) VALUES
("human resources"),
("finance"),
("audit");

INSERT INTO role(title,salary,department_id) VALUES
("Chief HR Officer", 160000, 1),
("CFO", 200000, 2),
("Audit Manager", 95000, 3);

INSERT INTO employee(first_name, last_name,role_id,manager_id) VALUES 
("Daffy","Duck", 1, null),
("Elmer","Fudd", 2, 1),
("Buggs", "Bunny", 3, 2);