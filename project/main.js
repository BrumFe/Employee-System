'use strict'


var employees, contEmployees, birthDate, idUser;
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
            p.classList.add('name-'+ contEmployees);
        break;
        case 3:
            p.classList.add('email-'+ contEmployees);
        break;
        case 4:
            span.classList.add('age-'+ contEmployees);
            span.classList.add('label');
            return span;
    }
    return p;
}




document.querySelector('.btn-call-form-add').addEventListener('click', function() {
    openFormAdd();
});

function openFormAdd() {
    document.getElementById('name-add').value = '';
    document.getElementById('email-add').value = '';
    document.getElementById('birthDate-add').value = '';
    document.querySelector('.form-add-employee').style.display = 'block';
}

document.querySelector('.btn-add-employee').addEventListener('click', function() {
    if (isInputNotNull() && isEmailValid('add') && isEmailAlreadyInUse()) {
        addEmployeer();
        addElementTr();
        isAdult(contEmployees);
        display(contEmployees);
        document.querySelector('.form-add-employee').style.display = 'none';
        contEmployees = employees.length;
    }
});

function addEmployeer() {
    employees[contEmployees] = {};
    employees[contEmployees].userId = contEmployees;
    employees[contEmployees].name = document.getElementById('name-add').value;
    employees[contEmployees].email = document.getElementById('email-add').value;
    employees[contEmployees].birthDate = document.getElementById('birthDate-add').value;
    calcAge(contEmployees);
}

function calcAge(employeeId) {
    var dateToday = new Date();
    var birthDate = new Date(employees[employeeId].birthDate);
    var age = dateToday.getFullYear() - birthDate.getFullYear();
    var month = dateToday.getMonth() - birthDate.getMonth();
    var day = dateToday.getDay() - birthDate.getDay();
    if (month < 0 || day < 0|| (day === 0 || month === 0 && dateToday.getDate() < birthDate.getDate())) {
        age--;
    }
    employees[employeeId].age = age;   
}

document.querySelector('.hidden-form-add').addEventListener('click', function() {
    document.querySelector('.form-add-employee').style.display = 'none';

    document.querySelector('.name-add').classList.remove('has-error');
    document.querySelector('.email-add').classList.remove('has-error');
    document.querySelector('.date-add').classList.remove('has-error');

    document.querySelector('.valid-email-1-add').style.display = 'none';
    document.querySelector('.valid-email-2-add').style.display = 'none';
});




document.querySelector('.btn-call-form-update').addEventListener('click', function() {
    openFormUpdate();
});

function openFormUpdate() {
    document.getElementById('name-update').value = '';
    document.getElementById('email-update').value = '';
    document.getElementById('birthDate-update').value = '';
    document.getElementById('employeeId-update').value = '';
    document.querySelector('.form-update-employee').style.display = 'block';
    document.querySelector('.invalid-id-update').style.display = 'none';   
    document.querySelector('.employeeId-update').classList.remove('has-error');
    document.querySelector('.fa-refresh').classList.add('fa-spin');
}

document.querySelector('.btn-search-employee').addEventListener('click', function() {
    document.querySelector('.invalid-id-update').style.display = 'none';   
    document.querySelector('.employeeId-update').classList.remove('has-error');
    var idUser = document.getElementById('employeeId-update').value;

    if (isIdUserValid(idUser, 'update')) {
        document.querySelector('.display-form-update').style.display = 'block';
        searchEmployee(idUser);
    }  
});

function searchEmployee(idUser) {
    document.getElementById('name-update').value = employees[idUser].name ;
    document.getElementById('email-update').value = employees[idUser].email ;
    document.getElementById('birthDate-update').value = employees[idUser].birthDate;
}

document.querySelector('.btn-update-employee').addEventListener('click', function() {
    idUser = document.getElementById('employeeId-update').value;
    if (isEmailValid('update')){
        updateEmployeer(idUser);
        display(idUser);
        isAdult(idUser);
        document.querySelector('.form-update-employee').style.display = 'none';
        document.querySelector('.display-form-update').style.display = 'none';
        document.querySelector('.fa-refresh').classList.remove('fa-spin');
    }
});

function updateEmployeer(idUser) {
    employees[idUser].name = document.getElementById('name-update').value;
    employees[idUser].email = document.getElementById('email-update').value;
    employees[idUser].birthDate = document.getElementById('birthDate-update').value;
    calcAge(idUser);
}

document.querySelector('.hidden-form-update').addEventListener('click', function() {
    document.querySelector('.form-update-employee').style.display = 'none';
    document.querySelector('.display-form-update').style.display = 'none';

    document.querySelector('.fa-refresh').classList.remove('fa-spin');

    document.querySelector('.name-update').classList.remove('has-error');
    document.querySelector('.email-update').classList.remove('has-error');
    document.querySelector('.date-update').classList.remove('has-error');

    document.querySelector('.valid-email-1-update').style.display = 'none';
    document.querySelector('.valid-email-2-update').style.display = 'none';
});




document.querySelector('.btn-call-form-remove').addEventListener('click', function() {
    openFormRemove();
});

function openFormRemove() {
    document.getElementById('employeeId-remove').value = '';
    document.querySelector('.form-remove-employee').style.display = 'block';
    document.querySelector('.invalid-id-remove').style.display = 'none';   
    document.querySelector('.employeeId-remove').classList.remove('has-error');
}

document.querySelector('.btn-remove-employee').addEventListener('click', function() {
    idUser = document.getElementById('employeeId-remove').value;
    if (isIdUserValid(idUser, 'remove')) {
        removeEmployeer(idUser);
        document.querySelector('.form-remove-employee').style.display = 'none';
    }
});

function removeEmployeer(idUser) {
    employees.splice(idUser, 1);
    contEmployees--;
    document.querySelector('.tr-'+ idUser).remove();
    for(var j = 0; j < contEmployees; j++) {
        employees[j].userId = j;
        display(j);
    }
}

document.querySelector('.hidden-form-remove').addEventListener('click', function() {
    document.querySelector('.form-remove-employee').style.display = 'none';
});




function calcAge(employeeId) {
    var dateToday = new Date();
    var birthDate = new Date(employees[employeeId].birthDate);
    var age = dateToday.getFullYear() - birthDate.getFullYear();
    var month = dateToday.getMonth() - birthDate.getMonth();
    var day = dateToday.getDay() - birthDate.getDay();
    if (month < 0 || day < 0|| (day === 0 || month === 0 && dateToday.getDate() < birthDate.getDate())) {
        age--;
    }
    employees[employeeId].age = age;   
}




function isIdUserValid(idUser, switchClass) {
    for (var i = 0; i < contEmployees; i++) {
        if (parseInt(idUser) === employees[i].userId) {
            return true;
        }
    }
    document.querySelector('.invalid-id-'+ switchClass).style.display = 'block';  
    document.querySelector('.employeeId-'+ switchClass).classList.add('has-error'); 
    return false;
}

function isInputNotNull(){
    var name, email, date;
    document.querySelector('.name-add').classList.remove('has-error');
    document.querySelector('.email-add').classList.remove('has-error');
    document.querySelector('.date-add').classList.remove('has-error');
    name = document.getElementById('name-add').value;
    email = document.getElementById('email-add').value;
    date = document.getElementById('birthDate-add').value;

    if (name !== '' && email !== '' && date !== '') {
        return true;
    } else {
        if (name === "") {
            document.querySelector('.name-add').classList.add('has-error');
        }
        if (email === "") {
            document.querySelector('.email-add').classList.add('has-error');
        }
        if (date === "") {
            document.querySelector('.date-add').classList.add('has-error');
        }
        return false;
    }
}

function isEmailValid(switchClass) {
    document.querySelector('.email-'+ switchClass).classList.remove('has-error');
    document.querySelector('.valid-email-1-'+ switchClass).style.display = 'none';
    var email = document.getElementById('email-'+ switchClass).value;
    for(var i = 0; i < email.length; i++) {
        if (email[i] === '@') {
            return true;
        }
    }
    document.querySelector('.email-'+ switchClass).classList.add('has-error');
    document.querySelector('.valid-email-1-'+switchClass).style.display = 'block';
    return false;
}

function isEmailAlreadyInUse() {
    document.querySelector('.email-add').classList.remove('has-error');
    document.querySelector('.valid-email-2-add').style.display = 'none';
    var email = document.getElementById('email-add').value;
    for(var i = 0; i < contEmployees; i++) {
        if (email === employees[i].email) {
            document.querySelector('.email-add').classList.add('has-error');
            document.querySelector('.valid-email-2-add').style.display = 'block';
            return false;
        }
    }
    return true;
}

function isAdult(idUser) {
    if (employees[idUser].age >= 18) {
        document.querySelector('.age-'+ idUser).classList.add('label-success');
        document.querySelector('.age-'+ idUser).classList.remove('label-danger');
        return true;
    } else {
        document.querySelector('.age-'+ idUser).classList.add('label-danger');
        document.querySelector('.age-'+ idUser).classList.remove('label-success');
        return false;
    }
}




function display(idUser) {
    document.querySelector('.name-'+ idUser).textContent = employees[idUser].name;
    document.querySelector('.email-'+ idUser).textContent = employees[idUser].email;
    document.querySelector('.age-'+ idUser).textContent = employees[idUser].age;
}