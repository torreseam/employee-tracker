 USE employee_manager_db;
 
INSERT INTO department (name) VALUES ("Engineering"), ("Legal"), ("Sales"), ("Marketing"), ("Human Resources"), ("Finance"), ("Information Technology");
INSERT INTO role (title, salary, department_id) VALUES ("Software Engineer", 150000, 1);
INSERT INTO role (title, salary, department_id) VALUES ("Claims Lawyer", 250000, 2);
INSERT INTO role (title, salary, department_id) VALUES ("Sales Manager", 160000, 3);
INSERT INTO role (title, salary, department_id) VALUES ("Marketing Lead", 80000, 4);
INSERT INTO role (title, salary, department_id) VALUES ("Human Resources Director", 120000, 5);
INSERT INTO role (title, salary, department_id) VALUES ("Accountant", 130000, 6);
INSERT INTO role (title, salary, department_id) VALUES ("Support Desk Manager", 70000, 7);
INSERT INTO role (title, salary, department_id) VALUES ("Data Engineer", 90000, 1);
INSERT INTO role (title, salary, department_id) VALUES ("Account Manager", 85000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Kevin", "Smeraglio", 1, NULL);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Barry", "Bonds", 3, NULL);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Samantha", "Johnson", 4, NULL);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Pamela", "Anderson", 2, NULL);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Brian", "Dawkins", 5, NULL);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Steve", "Jobs", 7, NULL);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Jerry", "Stiller", 8, NULL);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Marshall", "Mathers", 6, NULL);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Jessica", "Smith", 9, NULL);