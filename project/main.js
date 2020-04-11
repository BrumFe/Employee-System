'use strict'

//var contEmployees = 0;

var employees, contEmployees, birthDate;
employees = [];
contEmployees = employees.length;


initial();

function initial()
{
    addElementTr();
}

function addElementTr()
{
    var tr = document.createElement('tr');
    tr.classList.add('tr-'+ contEmployees);
    document.getElementById('tbody').appendChild(tr);
    addElementTd(tr)
}

function addElementTd(tr)
{ 
    for(var i = 0; i < 5; i++) {
        var td = document.createElement('td');  
        if (i != 0 && i != 1) {
            td.appendChild(addElementInput(i));
        } else if (i == 1) {
            td.textContent = contEmployees;
        } else {
            td.textContent = 'Actions'
        }
        tr.appendChild(td);
    }
}

function addElementInput(i)
{ 
    var input = document.createElement('input');
    switch(i) {
        case 2:
            input.placeholder = 'Name';
            input.classList.add('Name-'+ contEmployees);
        break;
        case 3:
            input.placeholder = 'Email';
            input.classList.add('Email-'+ contEmployees);
        break;
        case 4:
            input.placeholder = 'mm/dd/yyyy';
            input.classList.add('BirthDate-'+ contEmployees);
        break;
    }
    return input;
}


document.querySelector('.btn-add').addEventListener('click', function() {   
    addEmployeer();
    display(contEmployees);
    contEmployees++;
    addElementTr();
});

document.querySelector('.btn-edit').addEventListener('click', function() {
    //var idUser = prompt('Employeer Id');
    for(var idUser = 0; idUser < contEmployees; idUser++) {
        updateEmployeer(idUser);
         display(idUser);
    }
});

/*document.querySelector('.btn-delete').addEventListener('click', function() {
    if (contEmployees != 0) {
    var idUser = prompt('Please enter with Id user');
    document.querySelector('.tr-' + idUser).remove();
    }
});*/

function addEmployeer() {
    employees[contEmployees] = {};
    employees[contEmployees].name = document.querySelector('.Name-'+ contEmployees).value;
    employees[contEmployees].email = document.querySelector('.Email-'+ contEmployees).value;
    birthDate = document.querySelector('.BirthDate-'+ contEmployees).value;
    employees[contEmployees].birthDate = birthDate;
    calcAge(contEmployees);
}

function updateEmployeer(idUser) {
        employees[idUser].name = document.querySelector('.Name-'+ idUser).value;
        employees[idUser].email = document.querySelector('.Email-'+ idUser).value;
        birthDate = document.querySelector('.BirthDate-'+ idUser).value;
        if ( birthDate === employees[idUser].age) {
            console.log('this works!');
        } else {
            employees[idUser].birthDate = birthDate;
            calcAge(idUser);
        }
}

function display(user) {
        document.querySelector('.Name-'+ user).value = employees[user].name;
        document.querySelector('.Email-'+ user).value = employees[user].email;
        document.querySelector('.BirthDate-'+ user).value = employees[user].age;
}

function calcAge(employee) {
    if (employees[employee].birthDate === '') {
        employees[employee].birthDate = new Date();
    } 
    var dateToday = new Date();
    var birthDate = new Date(employees[employee].birthDate);
    var age = dateToday.getFullYear() - birthDate.getFullYear();
    var month = dateToday.getMonth() - birthDate.getMonth();
    var day = dateToday.getDay() - birthDate.getDay();
    if (month < 0 || day < 0|| (day === 0 || month === 0 && dateToday.getDate() < birthDate.getDate())) {
        age--;
    }
    employees[employee].age = age;   
}
