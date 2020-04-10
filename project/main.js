'use strict'

var contUser = 0;

var employees = [];

initial();

function initial()
{
    addElementTr();
}

function addElementTr()
{
    var tr = document.createElement('tr');
    tr.classList.add('tr-'+ contUser);
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
            td.textContent = contUser;
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
            input.classList.add('Name-'+ contUser);
        break;
        case 3:
            input.placeholder = 'Email';
            input.classList.add('Email-'+ contUser);
        break;
        case 4:
            input.placeholder = 'mm/dd/yyyy';
            input.classList.add('BirthDate-'+ contUser);
        break;
    }
    return input;
}


document.querySelector('.btn-add').addEventListener('click', function() {   
    addEmployeer();
    display(contUser);
    contUser++;
    addElementTr();
});

document.querySelector('.btn-edit').addEventListener('click', function() {
    var idUser = prompt('Please enter with Id user');
    updateEmployeer(idUser);
    display(idUser);
});

/*document.querySelector('.btn-delete').addEventListener('click', function() {
    if (contUser != 0) {
    var idUser = prompt('Please enter with Id user');
    document.querySelector('.tr-' + idUser).remove();
    }
});*/

function addEmployeer() {
    employees[contUser] = {};
    employees[contUser].name = document.querySelector('.Name-'+ contUser).value;
    employees[contUser].email = document.querySelector('.Email-'+ contUser).value;
    employees[contUser].birthDate = document.querySelector('.BirthDate-'+ contUser).value;
    calcAge(contUser);
}

function updateEmployeer(idUser) {
    employees[idUser].name = document.querySelector('.Name-'+ idUser).value;
    employees[idUser].email = document.querySelector('.Email-'+ idUser).value;
    employees[idUser].birthDate = document.querySelector('.BirthDate-'+ idUser).value;
    calcAge(idUser);
}

function display(user) {
    document.querySelector('.Name-'+ user).value = employees[user].name;
    document.querySelector('.Email-'+ user).value = employees[user].email;
    document.querySelector('.BirthDate-'+ user).value = employees[user].age;
}

function calcAge(idUser) {
    var dateToday = new Date();
    var birthDate = new Date(employees[idUser].birthDate);
    var age = dateToday.getFullYear() - birthDate.getFullYear();
    var month = dateToday.getMonth() - birthDate.getMonth();
    if (month < 0 || month === 0 &&  dateToday.getMonth() < birthDate.getMonth()) {
        age--;
    }
    employees[idUser].age = age;
}
