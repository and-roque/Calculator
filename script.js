//Arithmetic functions
function add (a,b) {return a+b;}
function subtract (a,b) {return a-b;}
function multiply (a,b) {return a*b;}
function divide (a,b) {return a/b;}

//TEST
let a = 5;
let b = 2;
let operator = "*";
console.log(operate (a,b,operator));

/* console.log(add(a,b));
console.log(subtract(a,b));
console.log(multiply(a,b));
console.log(divide(a,b)); */

//Operate
function operate (a,b,operator) {
    switch (operator) {
        case "+":
            return add(a,b);
            /* break; */
        case "-":
            return subtract(a,b);
            break;
        case "*":
            return multiply(a,b);
            break;
        case "/":
            return divide(a,b);
            break;
    }
};