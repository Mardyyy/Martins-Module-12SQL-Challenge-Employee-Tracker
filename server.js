const mysql = require('mysql2');
const inquirer = require('inquirer')

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Jr0902414.',
        database: 'employee_db'
    },
);

db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
    tracker();
});

var tracker = function () {
    inquirer.prompt([{
        type: 'list',
        name: 'prompt',
        message: 'What would you like to do?',
        choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department']
    }])
        .then((choice) => {
            if (choice.prompt === 'View All Employees') {
                db.query(`SELECT * FROM employee`, (err, result) => {
                    if (err) throw err;
                    console.log("All Employees");
                    console.log(result);
                    tracker();
                });
            } else if (choice.prompt === 'Add Employee') {
                db.query(`SELECT * FROM employee, role`, (err, result) => {
                    if (err) throw err;
                    inquirer.prompt([{
                        type: 'input',
                        name: 'firstName',
                        message: 'What is the employee\'s first name?'
                    },
                    {
                        type: 'input',
                        name: 'lastName',
                        message: 'What is the employee\'s last name?'
                    },
                    {
                        type: 'list',
                        name: 'role',
                        message: 'What is the employee\'s role?',
                        choices: () => {
                            var array = [];
                            for (var i = 0; i < result.length; i++) {
                                array.push(result[i].title);
                            }
                            var newArray = [...new Set(array)];
                            return newArray;
                        }
                    },
                    {
                        type: 'list',
                        name: 'manager',
                        message: 'who is the employee\'s manager?',
                        choices: () => {
                            var array = [];
                            for (var i = 0; i < result.length; i++) {
                                array.push(result[i].first_name);
                            }
                            var newArray = [...new Set(array)];
                            return newArray;
                        }

                    }
                    ]).then((choices) => {
                        for (var i = 0; i < result.length; i++) {
                            if (result[i].title === choices.role) {
                                var role = result[i];
                            }
                        }

                        db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`, [choices.firstName, choices.lastName, role.id, choices.manager.id], (err, result) => {
                            if (err) throw err;
                            console.log('Added an employee');
                            tracker();
                        });
                    })
                })
            } else if (choice.prompt === 'Update Employee Role') {
                db.query(`SELECT * FROM employee, role`, (err, result) => {
                    if (err) throw err;
                    inquirer.prompt([
                        {
                            type: 'list',
                            name: 'employee',
                            message: 'What employee?',
                            choices: () => {
                                var array = [];
                                for (var i = 0; i < result.length; i++) {
                                    array.push(result[i].first_name);
                                }
                                var newArray = [...new Set(array)];
                                return newArray;
                            }
                        },
                        {
                            type: 'list',
                            name: 'role',
                            message: 'What is the employee\'s new role?',
                            choices: () => {
                                var array = [];
                                for (var i = 0; i < result.length; i++) {
                                    array.push(result[i].title);
                                }
                                var newArray = [...new Set(array)];
                                return newArray;
                            }
                        },
                    ]).then((choices) => {
                        for (var i = 0; i < result.length; i++) {
                            if (result[i].title === choices.role) {
                                var role = result[i];
                            }
                        }

                        db.query(`INSERT INTO employee (role_id) VALUES (?)`, [role.id], (err, result) => {
                            if (err) throw err;
                            console.log('Updated employee info');
                            tracker();
                        });
                    })
                })
            } else if (choice.prompt === 'View All Roles') {
                db.query(`SELECT * FROM role`, (err, result) => {
                    if (err) throw err;
                    console.log("All Roles");
                    console.log(result);
                    tracker();
                });
            } else if (choice.prompt === 'Add Role') {
                db.query(`SELECT * FROM department`, (err, result) => {
                    if (err) throw err;
                    inquirer.prompt([
                        {
                            type: 'input',
                            name: 'role',
                            message: 'What is the name of the role?'
                        },
                        {
                            type: 'input',
                            name: 'salary',
                            message: 'What is the salary of the role?'
                        },
                        {
                            type: 'list',
                            name: 'department',
                            message: 'Which department does the role belong to?',
                            choices: () => {
                                var array = [];
                                for (var i = 0; i < result.length; i++) {
                                    array.push(result[i].name);
                                }
                                return array;
                            }
                        }
                    ]).then((choices) => {
                        for (var i = 0; i < result.length; i++) {
                            if (result[i].name === choices.department) {
                                var department = result[i];
                            }
                        }
    
                        db.query(`INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`, [choices.role, choices.salary, department.id], (err, result) => {
                            if (err) throw err;
                            console.log(`Added new role`)
                            tracker();
                        });
                    })
                })
            } else if (choice.prompt === 'View All Departments') {
                db.query(`SELECT * FROM department`, (err, result) => {
                    if (err) throw err;
                    console.log("All Departments");
                    console.log(result);
                    tracker();
                });
            } else if (choice.prompt === 'Add Department') {
                inquirer.prompt([{
                    type: 'input',
                    name: 'department',
                    message: 'What is the name of the department?'
                }]).then((input) => {
                    db.query(`INSERT INTO department (name) VALUES (?)`, [input.department], (err, result) => {
                        if (err) throw err;
                        console.log('Added a department');
                        tracker();
                    });
                })
            }
        })
}