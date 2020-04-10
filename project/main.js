'use strict'
/*
<th>
    <button class="btn btn-default btn-circle btn-add">
        <i class="fa fa-plus"></i>
    </button>

    <button class="btn btn-default btn-circle btn-edit">
        <i class="fa fa-refresh"></i>
    </button>

    <button class="btn btn-default btn-circle btn-delete">
        <i class="fa fa-minus"></i>
    </button>
</th>
*/

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
        if(i >= 1 && i <= 3) {
            td.appendChild(addElementInput(i));
        } else if (i === 0){
            td.textContent = contUser;;
        } else {
            addElementButton(td);
        }
        tr.appendChild(td);
    }
}

function addElementInput(i)
{ 
    var input = document.createElement('input');
    switch(i) {
        case 1:
            input.placeholder = 'Name';
            input.classList.add('Name-'+ contUser);
        break;
        case 2:
            input.placeholder = 'Email';
            input.classList.add('Email-'+ contUser);
        break;
        case 3:
            input.placeholder = 'mm/dd/yyyy';
            input.classList.add('BirthDate-'+ contUser);
        break;
    }
    return input;
}

function addElementButton(td) {
    var button, addClassButton;
    for(var i = 0; i < 3; i++) {   
        button = document.createElement('button');
        addClassButton = button.classList;
        addClassButton.add('btn');
        addClassButton.add('btn-default');
        addClassButton.add('btn-circle');
        if (i === 0) {
            addClassButton.add('btn-add');
        } else if (i === 1) {
            addClassButton.add('btn-edit-'+ contUser);
        } else {
            addClassButton.add('btn-delete-'+ contUser);
        }
        button.appendChild(addElementIcon(i));
        td.appendChild(button);
    }
}

function addElementIcon(cont) {
    var icon = document.createElement('i');
    var addClassIcon = icon.classList;
    addClassIcon.add('fa');

    if (cont === 0) {
        addClassIcon.add('fa-plus');
    } else if (cont === 1) {
        addClassIcon.add('fa-refresh');
    } else {
        addClassIcon.add('fa-minus');
    }
    return icon; 
}

document.querySelector('.btn-add').addEventListener('click',);

function addEmployeer(cont) {
    employees[cont] = {};
    employees[cont].name = document.querySelector('.Name-'+ cont).value;
    employees[cont].email = document.querySelector('.Email-'+ cont).value;
    employees[cont].birthDate = document.querySelector('.BirthDate-'+ cont).value;
    calcAge(cont);
    display(cont);
    contUser++;
    addElementTr();
}

/*function updateEmployeer(idUser) {
    employees[idUser].name = document.querySelector('.Name-'+ idUser).value;
    employees[idUser].email = document.querySelector('.Email-'+ idUser).value;
    employees[idUser].birthDate = document.querySelector('.BirthDate-'+ idUser).value;
    calcAge(idUser);
}*/

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
