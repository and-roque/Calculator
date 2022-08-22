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

function setOperator(operator) {
    currentOperator = operator;
        display.textContent = `${displayValue} ${currentOperator}`;
        if (opCheck === true){
            waitingValue = operate(waitingValue,displayValue,currentOperator);
        }
        waitingValue = displayValue;
        displayValue = "";
        dotCheck = false; 
        opCheck = true;
        eqCheck = true;
}

 //Operators
inputOperator.forEach((button) => {
    button.addEventListener('click', ()=> {
        setOperator(button.textContent);
    })
});

function equalCalculation() {
    Number(displayValue);
    Number(waitingValue);
        
    if(eqCheck===true && waitingValue != ""){
        lastValue.textContent=`${waitingValue} ${currentOperator} ${displayValue} = `;
        displayValue = operate(waitingValue,displayValue,currentOperator);
        eqCheck = false; 
    }
    displayValue = displayValue.toString();
    display.textContent = displayValue;
    currentOperator = "";
        
}
//Equal
startOperation.forEach((button) => {
    button.addEventListener('click', ()=> {
        equalCalculation();
    })
});

function setClear(){
    displayValue = "";
    waitingValue = "";
    display.textContent = displayValue;
    lastValue.textContent = waitingValue;
}
//Clear
clearOperation.forEach((button) => {
    button.addEventListener('click', ()=> {
        setClear();
    })
});

function setDelete(){
    displayValue = displayValue.slice(0,-1);
    display.textContent = displayValue;
}

//Delete Value
deleteValue.forEach((button) => {
    button.addEventListener('click', ()=> {
        setDelete();
    })
});

//Keyboard Event Listener
window.addEventListener('keydown', (event) =>{
    this.blur();
    let key = event.key;
    if(key >= 0 && key <= 9) populateDisplay(key);
    if(key === '.'){
        if ( dotCheck === false && displayValue===""){
            key = "0.";
            dotCheck = true; 
         } else if(dotCheck === true) {
             key = "";
         } else  dotCheck = true;
         populateDisplay(key);
    }
    if(key === "=" || key === "Enter"){
        equalCalculation();
    }
    if(key === "+" || key === "-" || key === "/" || key === "x" || key === "*"){
        if (key === "*") key = "x";
        setOperator(key);
    }
    if(key === "Backspace") setDelete();
    if(key === "Escape") setClear();
    
    console.log(key);
})