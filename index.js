const inquirer = require('inquirer');
const fs = require('fs')
const engineer = require('./tests/engineer.test')
const manager = require('./tests/manager.test')
const intern = require('./tests/intern.test')

const employees = []

function generateProfile () {
    startHtml()
    addTeamMember()
}

async function addTeamMember() {
    const {name, role, id, email} = await inquirer.prompt(
        [
            {
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
        ]
    )

    let info = ""
    if (role === 'engineer') {
        info = 'github username'
    } else if (role === 'intern') {
        info = 'school name'
    } else {
        info = 'office phone number'
    }

    const {roleInfo, moreMembers} = await inquirer.prompt(
        [
            {
                message: `Enter member ${info}`,
                name: 'roleInfo'
            },
            {
                type: 'list',
                message: 'would you like to add more members?',
                choices: ['yes', 'no'],
                name: 'moreMembers'
            }
        ]
    )

    employees.push(
        {
            name: name,
            role: role,
            id : id,
            email: email,
            roleInfo: {
                label: info,
                value: roleInfo
            }
        }
    )

    console.log(employees)

    if (moreMembers === 'yes') {
        addTeamMember()
    }
    
    function startHtml() {
        const html = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor" crossorigin="anonymous">            <title>Team Profile</title>
        </head>
        <body>
            <nav class="navbar navbar-dark bg-dark mb-5">
                <span class="navbar-brand mb-0 h1 w-100 text-center">Team Profile</span>
            </nav>
            <div class="container">
                <div class="row">`;
        fs.writeFile("./output/member.html", html, function(err) {
            if (err) {
                console.log(err);
            }
        });
        console.log("start");
    }
}

generateProfile()