'use strict'




var employees, birthDate, contEmployees, employeeNumberId, employeePosition, valueIdUpdate;
employees = [];

contEmployees = 0;
employeePosition = employees.length;



function addElementTr()
{
    var tr = document.createElement('tr');
    tr.id = ('tr-'+ contEmployees);
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
        button.classList.add('btn-update');
        button.value = contEmployees;
        button.onclick = function() {
            openFormUpdate(button.value);
        }
        icon.classList.add('fa-pencil');
    } else {
        button.classList.add('btn-warning');
        button.classList.add('btn-remove');
        button.value = contEmployees;
        button.onclick = function() {
            removeEmployeer(button.value);
        }
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
}

document.querySelector('.btn-add-employee').addEventListener('click', function() {
    if (isInputNotNull() && isEmailValid('add')) {
        addElementTr();
        addEmployeer();
        display(employeePosition);
        document.querySelector('.form-add-employee').style.display = 'none';
        contEmployees++;
        employeePosition = employees.length;
    }
});

function addEmployeer() {
    employees[employeePosition] = {};
    employees[employeePosition].employeeId = contEmployees;
    employees[employeePosition].name = document.getElementById('name-add').value;
    employees[employeePosition].email = document.getElementById('email-add').value;
    employees[employeePosition].birthDate = document.getElementById('birthDate-add').value;
    calcAge(employeePosition);
    isAdult(employeePosition);
}

document.querySelector('.hidden-form-add').addEventListener('click', function() {
    document.querySelector('.form-add-employee').style.display = 'none';

    document.querySelector('.name-add').classList.remove('has-error');
    document.querySelector('.email-add').classList.remove('has-error');
    document.querySelector('.date-add').classList.remove('has-error');

    document.querySelector('.valid-email-1-add').style.display = 'none';
    document.querySelector('.valid-email-2-add').style.display = 'none';
});




function openFormUpdate(idEmployee) {
    valueIdUpdate = idEmployee;
    employeeNumberId = searchEmployee(idEmployee);

    document.querySelector('.form-update-employee').style.display = 'block';
    document.querySelector('.form-remove-employee').style.display = 'none';

    document.querySelector('.name-update').classList.remove('has-error');
    document.querySelector('.email-update').classList.remove('has-error');
    document.querySelector('.date-update').classList.remove('has-error');

}

function searchEmployee(idEmployee) {
    for (var i = 0; i < employeePosition; i++) {
        if (parseInt(idEmployee) === employees[i].employeeId) {
            document.getElementById('name-update').value = employees[i].name;
            document.getElementById('email-update').value = employees[i].email;
            document.getElementById('birthDate-update').value = employees[i].birthDate;
            return i;
        }
    }
}

document.querySelector('.btn-update-employee').addEventListener('click', function() {
    if (isEmailValid('update')){
        updateEmployeer(employeeNumberId);
        displayUpdate(employeeNumberId);
        document.querySelector('.form-update-employee').style.display = 'none';
    }
});

function updateEmployeer(employeeId) {
        employees[employeeId].name = document.getElementById('name-update').value;
        employees[employeeId].email = document.getElementById('email-update').value;
        employees[employeeId].birthDate = document.getElementById('birthDate-update').value;
        calcAge(employeeId);
        isAdultUpdate(employeeId);
}

document.querySelector('.hidden-form-update').addEventListener('click', function() {
    document.querySelector('.form-update-employee').style.display = 'none';

    document.querySelector('.valid-email-1-update').style.display = 'none';
    document.querySelector('.valid-email-2-update').style.display = 'none';
});




function removeEmployeer(employeeId) {
    for (var i = 0; i < employeePosition; i++) {
        if (parseInt(employeeId) === employees[i].employeeId) {
            employees.splice(i, 1);
            document.getElementById('tr-'+ employeeId).remove();
            employeePosition = employees.length;
            document.querySelector('.form-update-employee').style.display = 'none';
        }
    }
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

function isAdult(employeeId) {
    if (employees[employeeId].age >= 18) {
        document.querySelector('.age-'+ contEmployees).classList.add('label-success');
        document.querySelector('.age-'+ contEmployees).classList.remove('label-danger');
        return true;
    } else {
        document.querySelector('.age-'+ contEmployees).classList.add('label-danger');
        document.querySelector('.age-'+ contEmployees).classList.remove('label-success');
        return false;
    }  
}

function isAdultUpdate(employeeId) {
    if (employees[employeeId].age >= 18) {
        document.querySelector('.age-'+ valueIdUpdate).classList.add('label-success');
        document.querySelector('.age-'+ valueIdUpdate).classList.remove('label-danger');
        return true;
    } else {
        document.querySelector('.age-'+ valueIdUpdate).classList.add('label-danger');
        document.querySelector('.age-'+ valueIdUpdate).classList.remove('label-success');
        return false;
    }  
}




function isInputNotNull(){
    var name, email, date;
    
    document.querySelector('.name-add').classList.remove('has-error');
    document.querySelector('.email-add').classList.remove('has-error');
    document.querySelector('.date-add').classList.remove('has-error');

    document.querySelector('.name-null').style.display = 'none';
    document.querySelector('.email-null').style.display = 'none';
    document.querySelector('.birthdate-null').style.display = 'none';

    name = document.getElementById('name-add').value;
    email = document.getElementById('email-add').value;
    date = document.getElementById('birthDate-add').value;

    if (name !== '' && email !== '' && date !== '') {
        return true;
    } else {
        if (name === "") {
            document.querySelector('.name-add').classList.add('has-error');
            document.querySelector('.name-null').style.display = 'block';
        }
        if (email === "") {
            document.querySelector('.email-add').classList.add('has-error');
            document.querySelector('.email-null').style.display = 'block';
        }
        if (date === "") {
            document.querySelector('.date-add').classList.add('has-error');
            document.querySelector('.birthdate-null').style.display = 'block';
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





function display(employeeId) {
    document.querySelector('.name-'+ contEmployees).textContent = employees[employeeId].name;
    document.querySelector('.email-'+ contEmployees).textContent = employees[employeeId].email;
    document.querySelector('.age-'+ contEmployees).textContent = employees[employeeId].age;
}
function displayUpdate(employeeId) {
        document.querySelector('.name-'+ valueIdUpdate).textContent = employees[employeeId].name;
        document.querySelector('.email-'+ valueIdUpdate).textContent = employees[employeeId].email;
        document.querySelector('.age-'+ valueIdUpdate).textContent = employees[employeeId].age;  
}