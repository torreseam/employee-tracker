// Dependencies
const mysql = require("mysql");
const inquirer = require('inquirer');

// MySQL DB
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Ar1D0m420",
    database: "employee_manager_db"
});

// Initiate MySQL Connection.
connection.connect(err => {
    // if (err) throw err;
    console.log("ERROR: ", err)
    console.log("connected as id " + connection.threadId);
    promptUser();
});


//start command prompt 
const promptUser = () => {
    inquirer
        .prompt({
            name: 'action',
            type: 'list',
            message: 'What would you like to do?',
            choices: ['View all employees', 'Add to departments, roles, or employees.', 'Update emplyee roles', 'Delete Employee', 'Exit']
        })
        .then(answer => {
            switch (answer.action) {
                case 'Add to departments, roles, or employees.':
                    addElement();
                    break;

                case 'View all employees':
                    viewEmployees();
                    break;

                case 'Update emplyee roles':
                    updateRoles();
                    break;

                case 'Delete Employee':
                    deleteEmployee();
                    break;

                case 'Exit':
                    connection.end();
                    break;
            }
        });
};

//employee view
const viewEmployees = () => {
    const query = "SELECT employee.id, employee.first_name, employee.last_name, role.title, employee.manager_id FROM employee LEFT JOIN role ON employee.role_id = role.id;";
    // add another join to match the manager ID
    const queryTwo = " SELECT CONCAT(E.first_name,' ', E.last_name) AS Employee, CONCAT(M.first_name, ' ', M.last_name) AS Manager FROM employee E LEFT JOIN employee M ON E.manager_id = M.id;";
    connection.query(query, (err, res) => {
        if (err) throw err;

        console.table(res);

        promptUser();
    });
};

//inquirer options
const addElement = () => {
    inquirer
        .prompt({
            name: 'table',
            type: 'list',
            message: 'What list would you like to add to?',
            choices: ['Departments', 'Roles', 'Employees']
        })
        .then(answer => {
            switch (answer.table) {
                case 'Departments':
                    addDepartment();
                    break;

                case 'Roles':
                    addRole();
                    break;

                case 'Employees':
                    addEmployee();
                    break;

            }
        });
};

//add department
const addDepartment = () => {
    inquirer
        .prompt({
            name: 'department',
            type: 'input',
            message: 'What is the name of the department to be added?'
        })
        .then(answer => {
            console.log(answer.department);

            //go to dept table and search for where it matches answer

            connection.query('INSERT INTO department (name) VALUES (?)', [answer.department], (err, res) => {
                if (err) throw err;

                console.log(`Department Added`);
                promptUser();
            });
        });
};

//create new role
const addRole = () => {
    let departments = [];

    connection.query(`SELECT * FROM department`, (err, data) => {
        if (err) throw err;
        console.log(data);

        const departments = data.map(d => ({ name: d.name, value: d.id }))

        inquirer
            .prompt([
                {
                    name: 'title',
                    type: 'input',
                    message: 'What is the role title?'
                },
                {
                    name: 'salary',
                    type: 'input',
                    message: 'What is the salary for this role?'
                },
                {
                    name: 'department_id',
                    type: 'list',
                    message: 'What department is this role in?',
                    choices: departments
                }
            ])
            .then(function ({ title, salary, department_id }) {
                // let index = departments.indexOf(department_id);

                connection.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [title, salary, department_id], (err, res) => {
                    if (err) throw err;

                    console.log(`Role Added`);
                    promptUser();
                });
            })
    });
};
//add new employee
const addEmployee = () => {

    connection.query(`SELECT * FROM employee`, (err, data) => {
        if (err) throw err;

        const employees = data.map(e => ({ name: `${e.first_name} ${e.last_name}`, value: e.id }))


        connection.query(`SELECT * FROM role`, (err, data) => {
            if (err) throw err;

            const roles = data.map(r => ({ name: r.title, value: r.id }));


            inquirer
                .prompt([
                    {
                        name: 'first_name',
                        type: 'input',
                        message: 'What is the employees first name?'
                    },
                    {
                        name: 'last_name',
                        type: 'input',
                        message: 'What is the employees last name?'
                    },
                    {
                        name: 'role_id',
                        type: 'list',
                        message: 'What is their role?',
                        choices: roles
                    },
                    {
                        name: 'manager_id',
                        type: 'list',
                        message: 'Who is their manager?',
                        choices: employees
                    }
                ])
                .then(function ({ first_name, last_name, role_id, manager_id }) {

                    connection.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);', [first_name, last_name, role_id, manager_id], function (err, data) {
                        if (err) throw err;

                        console.log('Employee added!');
                        promptUser();
                    });
                });

        });
    });
};

//update roles 
const updateRoles = () => {

    connection.query(`SELECT * FROM employee`, (err, data) => {
        if (err) throw err;
        console.log(data);

        const employees = data.map(e => ({ name: `${e.first_name} ${e.last_name}`, value: e.id }))
        console.log(employees);

        connection.query(`SELECT * FROM role`, (err, data) => {
            if (err) throw err;

            const roles = data.map(r => ({ name: r.title, value: r.id }));

            inquirer
                .prompt([
                    {
                        name: 'employee_id',
                        message: "Which employees role needs to be updated",
                        type: 'list',
                        choices: employees
                    },
                    {
                        name: 'role_id',
                        message: "What is the new role?",
                        type: 'list',
                        choices: roles
                    }
                ]).then(function ({ employee_id, role_id }) {
                    console.log('employee_id:', employee_id)
                    console.log('role_id:', role_id)


                    connection.query(`UPDATE employee SET role_id = ? WHERE id = ?`, [role_id, employee_id], function (err, data) {
                        if (err) throw err;

                        console.log('Role updated!')
                        promptUser();
                    })
                })
        });
    })
}
//Delete empployee from table
const deleteEmployee = () => {
    connection.query(`SELECT * FROM employee`, (err, data) => {
        if (err) throw err;
        console.log(data);

        const employees = data.map(e => ({ name: `${e.first_name} ${e.last_name}`, value: e.id }))
        console.log(employees);

        inquirer
            .prompt([
                {
                    name: 'delEmployee_id',
                    type: 'list',
                    message: 'Which employee should be deleted?',
                    choices: employees
                }
            ])
            .then(function ({ delEmployee_id }) {

                connection.query('DELETE FROM employee_manager_DB.employee WHERE id = ?;', [delEmployee_id], function (err, data) {
                    if (err) throw err;

                    console.log('Employee deleted!');
                    promptUser();
                });
            });


    });
}
