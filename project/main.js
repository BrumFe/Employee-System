'use strict'


var employees, contEmployees, birthDate, employeeId;
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
        if (i === 0) {
            td.classList.add('id-'+ contEmployees);
            td.textContent = contEmployees;
        } else if (i < 4) {
            td.appendChild(addElementText(i));
        } else {
            for(var j = 0; j < 2; j++) {
                td.appendChild(createButton(j));
            }
        }
        tr.appendChild(td);
    }
}

function addElementText(positionOnTr)
{ 
    var p = document.createElement('p');
    var span = document.createElement('span');
    switch(positionOnTr) {
        case 1:
            p.classList.add('name-'+ contEmployees);
        break;
        case 2:
            p.classList.add('email-'+ contEmployees);
        break;
        case 3:
            span.classList.add('age-'+ contEmployees);
            span.classList.add('label');
        return span;
    }
    return p;
}

function createButton(positionOnTr) {
    var button = document.createElement('button');
    var icon = document.createElement('i');

    button.classList.add('btn');
    button.classList.add('btn-circle');

    icon.classList.add('fa');

    if (positionOnTr === 0) {
        button.classList.add('btn-success');
        button.classList.add('btn-call-form-update');
        icon.classList.add('fa-pencil');
    } else {
        button.classList.add('btn-warning');
        button.classList.add('btn-remove');
        icon.classList.add('fa-trash-o');
    }
    button.appendChild(icon);
    return button;
}




document.querySelector('.btn-call-form-add').addEventListener('click', function() {
    openFormAdd();
});

function openFormAdd() {
    document.getElementById('name-add').value = '';
    document.getElementById('email-add').value = '';
    document.getElementById('birthDate-add').value = '';

    document.querySelector('.form-add-employee').style.display = 'block';
    document.querySelector('.form-update-employee').style.display = 'none';
    document.querySelector('.form-remove-employee').style.display = 'none';
 
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
    employees[contEmployees].employeeId = contEmployees;
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



document.querySelector('.btn-call-form-update').onclick = function () {
    openFormUpdate();
};

function openFormUpdate() {
    document.getElementById('name-update').value = '';
    document.getElementById('email-update').value = '';
    document.getElementById('birthDate-update').value = '';
    document.getElementById('employee-id-update').value = '';

    document.querySelector('.form-update-employee').style.display = 'block';
    document.querySelector('.form-add-employee').style.display = 'none';
    document.querySelector('.form-remove-employee').style.display = 'none';
    document.querySelector('.invalid-id-update').style.display = 'none';
}

document.querySelector('.btn-search-employee').addEventListener('click', function() {
    document.querySelector('.invalid-id-update').style.display = 'none';   
    document.querySelector('.valid-id-update').classList.remove('has-error');
    var employeeId = document.getElementById('employee-id-update').value;

    if (isIdUserValid(employeeId, 'update')) {
        document.querySelector('.display-form-update').style.display = 'block';
        searchEmployee(employeeId);
    }  
});

function searchEmployee(employeeId) {
    document.getElementById('name-update').value = employees[employeeId].name ;
    document.getElementById('email-update').value = employees[employeeId].email ;
    document.getElementById('birthDate-update').value = employees[employeeId].birthDate;
}

document.querySelector('.btn-update-employee').addEventListener('click', function() {
    employeeId = document.getElementById('employee-id-update').value;
    if (isEmailValid('update')){
        updateEmployeer(employeeId);
        display(employeeId);
        isAdult(employeeId);
        document.querySelector('.form-update-employee').style.display = 'none';
        document.querySelector('.display-form-update').style.display = 'none';
        document.querySelector('.fa-refresh').classList.remove('fa-spin');
    }
});

function updateEmployeer(employeeId) {
    employees[employeeId].name = document.getElementById('name-update').value;
    employees[employeeId].email = document.getElementById('email-update').value;
    employees[employeeId].birthDate = document.getElementById('birthDate-update').value;
    calcAge(employeeId);
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
    document.getElementById('employee-id-remove').value = '';

    document.querySelector('.form-remove-employee').style.display = 'block';
    document.querySelector('.form-update-employee').style.display = 'none';
    document.querySelector('.form-add-employee').style.display = 'none';
 

    document.querySelector('.invalid-id-remove').style.display = 'none';   
    document.querySelector('.valid-id-remove').classList.remove('has-error');
}

document.querySelector('.btn-remove-employee').addEventListener('click', function() {
    employeeId = document.getElementById('employee-id-remove').value;
    if (isIdUserValid(employeeId, 'remove')) {
        removeEmployeer(employeeId);
        document.querySelector('.form-remove-employee').style.display = 'none';
    }
});

function removeEmployeer(employeeId) {

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

function isAdult(employeeId) {
    if (employees[employeeId].age >= 18) {
        document.querySelector('.age-'+ employeeId).classList.add('label-success');
        document.querySelector('.age-'+ employeeId).classList.remove('label-danger');
        return true;
    } else {
        document.querySelector('.age-'+ employeeId).classList.add('label-danger');
        document.querySelector('.age-'+ employeeId).classList.remove('label-success');
        return false;
    }
}




function isIdUserValid(employeeId, switchClass) {
    for (var i = 0; i < contEmployees; i++) {
        if (parseInt(employeeId) === employees[i].employeeId) {
            return true;
        }
    }
    document.querySelector('.invalid-id-'+ switchClass).style.display = 'block';  
    document.querySelector('.valid-id-'+ switchClass).classList.add('has-error'); 
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




function display(employeeId) {
    document.querySelector('.name-'+ employeeId).textContent = employees[employeeId].name;
    document.querySelector('.email-'+ employeeId).textContent = employees[employeeId].email;
    document.querySelector('.age-'+ employeeId).textContent = employees[employeeId].age;
}