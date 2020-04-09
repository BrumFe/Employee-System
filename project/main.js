'use strict'

var contUser = 0;

var employee = {
    idUser: [],
    completeName: [],
    email: [],
    birthYear: [],
    age: [],
    calcAge: function(positionUser) 
    {
        this.age[positionUser] = 2020 - this.birthYear[positionUser]; 
    }
};

initial();

function initial()
{
    addElementTr();
}

function addElementTr()
{

    var tr = document.createElement('tr');
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
            input.placeholder = 'Birth Year';
            input.classList.add('Year-'+ contUser);
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

document.querySelector('.btn-remove').addEventListener('click', function() {
    
});

function addEmployeer() {
    employee.idUser[contUser] = contUser;
    employee.completeName[contUser] = document.querySelector('.Name-'+ contUser).value;
    employee.email[contUser] = document.querySelector('.Email-'+ contUser).value;
    employee.birthYear[contUser] = document.querySelector('.Year-'+ contUser).value;
    employee.calcAge(contUser);
}

function updateEmployeer(idUser) {
    employee.completeName[idUser] = document.querySelector('.Name-'+ idUser).value;
    employee.email[idUser] = document.querySelector('.Email-'+ idUser).value;
    employee.birthYear[idUser] = document.querySelector('.Year-'+ idUser).value;
    employee.calcAge(idUser);
}

function display(user) {
    document.querySelector('.Name-'+ user).value = employee.completeName[user];
    document.querySelector('.Email-'+ user).value = employee.email[user];
    document.querySelector('.Year-'+ user).value = employee.age[user];
}

