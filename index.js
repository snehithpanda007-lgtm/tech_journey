// This is a simple JavaScript code that logs "Hello World" to the console
console.log('Hello World');

let name = 'Snehith';
console.log(name); 

let interestRate = 0.05;
interestRate = 1;
console.log(interestRate);

let person = {
    name: 'Snehith',
    age: 21
};
console.log(person);

let isApproved = false;
let firstName = undefined;
let selectedColor = null;

let selectedColors = ['red', 'blue'];
selectedColors[2] = 'green';
console.log(selectedColors.length);

function greet(name,lastName) {
    console.log('Hello ' + name + ' ' + lastName + '!');
}

greet('Snehith');
greet('John', 'Smith');

function square(number) {
    return number * number;
}

console.log(square(5));