'use strict'

var contUser = 0;

var employee = {
    idUser: [],
    completeName: [],
    email: [],
    age: [],
    calcAge: function(year) 
    {
        this.age[contUser] = 2020 - year; 
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
    for(var i = 0; i < 4; i++) {
        var td = document.createElement('td');  
        if(i != 0) {
            td.appendChild(addElementInput(i));
        } else {
            td.textContent = contUser;
        }
        tr.appendChild(td);
    }
}

function addElementInput(i)
{ 
    var input = document.createElement('input');
    switch(i) {
        case 0: 
        break; 
        case 1:
            input.placeholder = 'Name';
            input.classList.add('Name-'+ contUser);
        break;
        case 2:
            input.placeholder = 'Email';
            input.classList.add('Email-'+ contUser);
        break;
        case 3:
            input.placeholder = 'Birth Year';
            input.classList.add('Year-'+ contUser);
        break;
    }
    return input;
}


document.querySelector('.btn-add').addEventListener('click', function() {
    employee.idUser[contUser] = contUser;
    employee.completeName[contUser] = document.querySelector('.Name-'+ contUser).value;
    employee.email[contUser] = document.querySelector('.Email-'+ contUser).value;
    employee.calcAge(document.querySelector('.Year-'+ contUser).value);
    display();
    contUser++;
    addElementTr();
});

function display() {
    document.querySelector('.Name-'+ contUser).value = employee.completeName[contUser];
    document.querySelector('.Email-'+ contUser).value = employee.email[contUser];
    document.querySelector('.Year-'+ contUser).value = employee.age[contUser];
}