//Divs
const display = document.querySelector('.display');
const lastValue = document.querySelector('.lastValue');  
const buttons = document.querySelectorAll("button");

//Common Values
let displayValue="";
let currentValue="";
let currentOperator="";
let waitingValue="";
let dotCheck = false;
let opCheck = false;
let eqCheck = true;
const inputValue = document.querySelectorAll('.number');
const inputOperator = document.querySelectorAll('.operator');
const startOperation = document.querySelectorAll('.equal');
const clearOperation = document.querySelectorAll('.clear');
const deleteValue = document.querySelectorAll('.delete');


//Arithmetic functions
function add (a,b) {return Number(a)+Number(b);}
function subtract (a,b) {return a-b;}
function multiply (a,b) {return a*b;}
function divide (a,b) {return a/b;}

//Operate
function operate (a,b,operator) {
    switch (operator) {
        case "+":
            return add(a,b);
        case "-":
            return subtract(a,b);
        case "x":
            return multiply(a,b);
        case "/":
            return divide(a,b);
    }
};

function populateDisplay (input){
    displayValue = displayValue + input;
    display.textContent = displayValue;
    lastValue.textContent=`${waitingValue} ${currentOperator}`;
}

 //Event Listeners

 //Numbers
 inputValue.forEach((button) => {
    button.addEventListener('click', () => {
        currentValue = button.textContent;
    
        //Make sure "." doesn't get it more then once
        if (currentValue==="." && dotCheck === false && displayValue===""){
           currentValue = "0.";
           dotCheck = true; 
        } else if(dotCheck === true && currentValue===".") {
            currentValue = "";
        } else if(currentValue===".") dotCheck = true;

        populateDisplay(currentValue);
    })
 });

 //Operators
inputOperator.forEach((button) => {
    button.addEventListener('click', ()=> {
        currentOperator = button.textContent;
        display.textContent = `${displayValue} ${currentOperator}`;
        if (opCheck === true){
            waitingValue = operate(waitingValue,displayValue,currentOperator);
        }
        waitingValue = displayValue;
        displayValue = "";
        dotCheck = false; 
        opCheck = true;
        eqCheck = true;
        
    })
});

//Equal
startOperation.forEach((button) => {
    button.addEventListener('click', ()=> {
        Number(displayValue);
        Number(waitingValue);
        
        if(eqCheck===true && waitingValue != ""){
          lastValue.textContent=`${waitingValue} ${currentOperator} ${displayValue} = `;
          displayValue = operate(waitingValue,displayValue,currentOperator);
          eqCheck = false; 
        }
        display.textContent = displayValue;
        
    })
});

//Clear
clearOperation.forEach((button) => {
    button.addEventListener('click', ()=> {
        displayValue = "";
        waitingValue = "";
        display.textContent = displayValue;
        lastValue.textContent = waitingValue;
    })
});

//Delete Value
deleteValue.forEach((button) => {
    button.addEventListener('click', ()=> {
        displayValue = "";
        display.textContent = displayValue;
    })
});
