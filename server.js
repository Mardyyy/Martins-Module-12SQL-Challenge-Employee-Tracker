const mysql = require('mysql2');
const inquirer = requiq('inquirer')

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Jr0902414.',
        database: 'employee_db'
    },
    console.log('Connected to the employee database')
);

db.connect(err => {
    if (err) throw err;
    console.log('Connected to Emplyee Manager/Database');
    tracker();
})

var tracker = function () {
    inquirer.prompt({
        name: 'allOptions',
        type: 'list',
        message: 'What would you like to do?',
        choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department']
    }).then((choice) => {
        if (choice.prompt === 'View All Employees') {
            db.query('Select * FROM employee', (err, result) => {
                if (err) throw err;
                console.log("All Employees");
                console.log(result);
                tracker();
            });
        } else if (choice.prompt === 'Add Employee') {
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
                choices: ''
            },
            {
                type: 'list',
                name: 'manager',
                message: 'who is the employee\'s manager?',
                choices: ''
            }])
        } else if (choice.prompt === 'Update Employee Role') {
            inquirer.prompt([
                {
                    type: 'list',
                        name: 'employee',
                        message: 'Which employee do you want to update?',
                        Choices: ''
                },
                {
                    type: 'list',
                        name: 'role',
                        message: 'What is the employee\'s new role?',
                        Choices: ''
                },
            ])
        } else if (choice.prompt === 'View All Roles') {
            db.query('Select * FROM role', (err, result) => {
                if (err) throw err;
                console.log("All Roles");
                console.log(result);
                tracker();
            });
        } else if (choice.prompt === 'Add Role') {
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
                    choices: ''
                }
            ])
        } else if (choice.prompt === 'View All Departments') {
            db.query('Select * FROM department', (err, result) => {
                if (err) throw err;
                console.log("All Departments");
                console.log(result);
                tracker();
            });
        } else if (choice.prompt === 'Add Department') {
            inquirer.prompt([{
                type: 'input',
                name: 'department',
                message: 'What is the name of the dpeartment?'
            }])
        };
    })
}