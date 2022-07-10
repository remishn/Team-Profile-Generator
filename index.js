const inquirer = require('inquirer');
const fs = require('fs')
const engineer = require('./tests/engineer.test')
const manager = require('./tests/manager.test')
const intern = require('./tests/intern.test')

const employees = []

function addTeamMember() {
    inquirer.prompt([{
        message: 'enter member name',
        name :'name'
    },
    {
        type: 'list',
        message: 'select member role',
        choices: ['engineer', 'manager', 'intern'],
        name: 'role'
    },
    {
        message: 'enter member id',
        name: 'id'
    },
    {
        message: 'enter member email address',
        name: 'email'
    },

])
.then(function({name, role, id, email}) {
    let roleInfo = ""
    if (role === 'engineer') {
        roleInfo = 'github username'
    } else if (role === 'intern') {
        roleInfo = 'school name'
    } else {
        roleInfo = 'office phone number'
    }
    inquirer.prompt([{
        message: `Enter member ${roleInfo}`,
        name: 'roleInfo'
    },
    {
        type: 'list',
        message: 'would you like to add more members?',
        choices: ['yes', 'no'],
        name: 'moreMembers'
    }
])
.then(function({roleInfo, moreMembers}) {
    let newMember;
    if (role === "engineer") {
        newMember = new engineer(name, id, email, roleInfo);
    } else if (role === "Intern") {
        newMember = new intern(name, id, email, roleInfo);
    } else {
        newMember = new manager(name, id, email, roleInfo);
    }
    employees.push(newMember);
    addHtml(newMember)
    .then(function() {
        if (moreMembers === "yes") {
            addMember();
        } else {
            console.log("done")
            // finishHtml();
        }
        })
    }
    )
}

)
}
addTeamMember()