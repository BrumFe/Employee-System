'use strict'

//var contEmployees = 0;

var employees, contEmployees, birthDate;
employees = [];
contEmployees = employees.length;

function addElementTr()
{
    var tr = document.createElement('tr');
    tr.classList.add('tr-'+ contEmployees);
    document.getElementById('tbody').appendChild(tr);
    addElementTd(tr);
}

function addElementTd(tr)
{ 
    for(var i = 0; i < 5; i++) {
        var td = document.createElement('td');  
        if (i > 1) {
            td.appendChild(addElementText(i));
        } else if (i === 1) {
            td.classList.add('idUser-'+ contEmployees);
            td.textContent = contEmployees;
        } else {
            td.textContent = 'Actions'
        }
        tr.appendChild(td);
    }
}

function addElementText(positionOnTr)
{ 
    var p = document.createElement('p');
    var span = document.createElement('span');
    switch(positionOnTr) {
        case 2:
            p.classList.add('Name-'+ contEmployees);
        break;
        case 3:
            p.classList.add('Email-'+ contEmployees);
        break;
        case 4:
            span.classList.add('Age-'+ contEmployees);
            span.classList.add('label');
            if (isAdult(contEmployees)) {
                span.classList.add('label-success');
            } else {
                span.classList.add('label-danger');
            }
            return span;
        break;
    }
    return p;
}


document.querySelector('.call-form-add').addEventListener('click', function() {
    openForm();
});
document.querySelector('.btn-add-employee').addEventListener('click', function() {
    if (isInputNotNull()) {
        addEmployeer();
        addElementTr();
        display(contEmployees);
        document.querySelector('.form-add-employee').style.display = 'none';
        contEmployees = employees.length;
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

function openForm() {
    document.getElementById('Name').value = '';
    document.getElementById('Email').value = '';
    document.getElementById('BirthDate').value = '';
    document.querySelector('.form-add-employee').style.display = 'block';
}

function isInputNotNull(){
    var name, email, date;
    name = document.getElementById('Name').value;
    email = document.getElementById('Email').value;
    date = document.getElementById('BirthDate').value;

    if (name !== '' && email !== '' && date !== '') {
        return true;
    } else {
        return false;
    }
}

function addEmployeer() {
    employees[contEmployees] = {};
    employees[contEmployees].userId = contEmployees;
    employees[contEmployees].name = document.getElementById('Name').value;
    employees[contEmployees].email = document.getElementById('Email').value;
    employees[contEmployees].birthDate = document.getElementById('BirthDate').value;
    calcAge(contEmployees);
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
    document.querySelector('.Name-'+ user).textContent = employees[user].name;
    document.querySelector('.Email-'+ user).textContent = employees[user].email;
    document.querySelector('.Age-'+ user).textContent = employees[user].age;
}

function isAdult(idUser) {
    if (employees[idUser].age >= 18) {
        return true;
    } else {
        return false;
    }
}

function calcAge(employee) {
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
