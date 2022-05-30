// global variable decleration
let append = false;
let operations = {
    add: add,
    subtract: subtract,
    divide: divide,
    multiply: multiply,
}
let selectedOperator = null;

let displayValue = null;
let lastValue = null;

// create the operations
function add(a,b) {
    return a+b;
}

function subtract(a,b) {
    return a-b;
}

function multiply(a,b) {
    return a*b;
}

function divide(a,b) {
    if (b===0) {
        displayValue = "To infinity and beyond!";
        updateDisplay();
        append=false;
        selectedOperator = null;
        lastValue = null;        
    }
    return a/b;
}

function operate(a,b,operator) {
    return Math.round(100000*operator(a,b,selectedOperator))/100000;
}

// function for handling a pressed digit
function digitPressed(event) {
    if (append) {
        displayValue += event.target.textContent;
    } else {
        displayValue = event.target.textContent;
        append = true;
    }

    updateDisplay();
}

// function for handling a pressed operator
function operatorPressed (event) {
    if (selectedOperator!==null) {
        compute();       
    } 

    selectedOperator = operations[event.target.name];
    append = false; // start a new number entry
    lastValue = displayValue;
    updateDisplay();
}

// function for making a computation
function compute() {
    if (selectedOperator!==null) {
        let result = operate(Number(lastValue),Number(displayValue),selectedOperator);
        displayValue = String(result);
        append=false;
        lastValue = displayValue;
        selectedOperator=null;
    }  else {
        updateDisplay();
    }

    updateDisplay();
}

// assign operator elements
let btnEquals = document.querySelector('.equals');
btnEquals.addEventListener('click',compute);

let btnClear = document.querySelector('.clear');
btnClear.addEventListener('click',function() {
    selectedOperator = null;
    displayValue = 0;
    lastValue = null;
    append = false;
    updateDisplay();
}
)

let btnOperators = document.querySelectorAll('.operator');
btnOperators.forEach((btn)=>btn.addEventListener('click',operatorPressed));

// assign DOM elements
let numbers = document.querySelectorAll('.digit');
numbers.forEach((number)=> number.addEventListener('click',digitPressed));

// update the display
const display = document.querySelector('.display');
const equals = document.querySelector('.equals');
equals.addEventListener('click',updateDisplay);

function updateDisplay() {
   display.textContent = displayValue;
   
}

