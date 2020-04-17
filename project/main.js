'use strict'

//var contEmployees = 0;

var employees, contEmployees, birthDate, verifyAddEmployeer;
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
    verifyAddEmployeer = true;
}

function addElementTd(tr)
{ 
    for(var i = 0; i < 5; i++) {
        var td = document.createElement('td');  
        if (i != 0 && i != 1) {
            td.appendChild(addElementInput(i));
        } else if (i == 1) {
            td.classList.add('idUser-'+ contEmployees);
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
    if (verifyAddEmployeer) {
        addEmployeer();
        display(contEmployees);
        alert('Registered employee!');
    } else {
        contEmployees++;
        addElementTr();
    }
});

document.querySelector('.btn-edit').addEventListener('click', function() {
    for(var idUser = 0; idUser < contEmployees; idUser++) {
        updateEmployeer(idUser);
         display(idUser);
    }
});

document.querySelector('.btn-delete').addEventListener('click', function() {
    if (contEmployees != 0) {
    var idUser = prompt('Please enter with Id user');
    removeEmployeer(idUser);
    }
});

function addEmployeer() {
    employees[contEmployees] = {};
    employees[contEmployees].userId = contEmployees;
    employees[contEmployees].name = document.querySelector('.Name-'+ contEmployees).value;
    employees[contEmployees].email = document.querySelector('.Email-'+ contEmployees).value;
    birthDate = document.querySelector('.BirthDate-'+ contEmployees).value;
    employees[contEmployees].birthDate = birthDate;
    calcAge(contEmployees);
    verifyAddEmployeer = false;
}

function updateEmployeer(idUser) {
    employees[idUser].name = document.querySelector('.Name-'+ idUser).value;
    employees[idUser].email = document.querySelector('.Email-'+ idUser).value;
    var birthDate = document.querySelector('.BirthDate-'+ idUser).value;
    updateAge(idUser, birthDate);
}

function removeEmployeer(idUser) {
    employees.splice(idUser, 1);
    contEmployees--;
    document.querySelector('.tr-'+ idUser).remove();
    for(var j = 0; j < contEmployees; j++) {
        employees[j].userId = j;
        display(j);
    }
}

function display(user) {
        document.querySelector('.Name-'+ user).value = employees[user].name;
        document.querySelector('.Email-'+ user).value = employees[user].email;
        document.querySelector('.BirthDate-'+ user).value = employees[user].age;
}

function calcAge(employee) {
    if (employees[employee].birthDate === '') {
        employees[employee].birthDate = prompt('Please set employee\'s birth date!');
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

function updateAge(employee, birth) {
    if (birth.length < 4) {
        return;
    } else {
        employees[employee].birthDate = birth;
        calcAge(employee);
    }
}
