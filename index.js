const inquirer = require('inquirer')
const fs = require('fs')
const engineer = require('./tests/engineer.test')
const manager = require('./tests/manager.test')
const intern = require('./tests/intern.test')

const employees = []

async function generateProfile () {
    await addTeamMember()
    startHtml()
}
// create function to accept user input  
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
 // create additional questions for engineer and intern
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
        await addTeamMember()
    }
    
    
}
// genetate main Html 
// use for loop to populate employee information
function startHtml() {
    let employeeHtml = ""
    for (let i = 0; i < employees.length; i++) {
        employeeHtml = employeeHtml + addHtml(employees[i])
    }

    const html = `
<!DOCTYPE html>
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
            <div class="row">
                ${employeeHtml}
            </div>
        </div>
    </body>
</html>    
`
// create html file under output folder
    fs.writeFile("./output/member.html", html, function(err) {
        if (err) {
            console.log(err)
        }
      
    })
}
// create each employee page

function addHtml(member) {
    console.log(member)
    const name = member.name
    const role = member.role
    const id = member.id
    const email = member.email
    let data = ""
    if (role === "engineer") {
        const gitHub = member.roleInfo.value
        data = `<div class="col-6">
        <div class="card mx-auto mb-3" style="width: 18rem">
        <h5 class="card-header" style="background-color: blue; color: white;">${name}<br /><br />Engineer</h5>
        <ul class="list-group list-group-flush">
            <li class="list-group-item">ID: ${id}</li>
            <li class="list-group-item">Email Address: ${email}</li>
            <li class="list-group-item">GitHub: ${gitHub}</li>
        </ul>
        </div>
    </div>`
    } else if (role === "Intern") {
        const school = member.roleInfo.value
        data = `<div class="col-6">
        <div class="card mx-auto mb-3" style="width: 18rem">
        <h5 class="card-header">${name}<br /><br />Intern</h5>
        <ul class="list-group list-group-flush">
            <li class="list-group-item">ID: ${id}</li>
            <li class="list-group-item">Email Address: ${email}</li>
            <li class="list-group-item">School: ${school}</li>
        </ul>
        </div>
    </div>`
    } else {
        const officePhone = member.roleInfo.value
        data = `<div class="col-6">
        <div class="card mx-auto mb-3" style="width: 18rem">
        <h5 class="card-header">${name}<br /><br />Manager</h5>
        <ul class="list-group list-group-flush">
            <li class="list-group-item">ID: ${id}</li>
            <li class="list-group-item">Email Address: ${email}</li>
            <li class="list-group-item">Office Phone: ${officePhone}</li>
        </ul>
        </div>
    </div>`
    }
    console.log("adding team member")
    return data
}

generateProfile()