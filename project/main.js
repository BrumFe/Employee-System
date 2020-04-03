'use strict'
var employee = {
    firstname: '',
    lastname: '',
    email: '',
    age: 0
};

document.querySelector('.btn-add').addEventListener('click', function() {
    employee.name = document.querySelector('.name').value;
    employee.email = document.querySelector('.email').value;
    employee.age = document.querySelector('.age').value;
    document.querySelector('.age').value = 2020 - employee.age;
    implementMoreTables();
});

function implementMoreTables(){
    var node = document.createElement("TR"); 
    var t =  
        document.createTextNode(); 
    node.appendChild(t); 
    document.getElementById("tbody").appendChild(node); 
}