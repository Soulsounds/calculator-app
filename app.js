const calculator = {
  displayValue: '0',
  firstOperand: null,
  waitingForSecondOperand: false,
  operator: null,
};

function inputDigit(digit){
  const { displayValue, waitingForSecondOperand } = calculator;
  //overwrite 'displayValue' if current value is '0', otherwise append to it 
  if(waitingForSecondOperand === true){
    calculator.displayValue = digit;
    calculator.waitingForSecondOperand = false;
  } else{
    calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
  }
  console.log(calculator);
}

function inputDecimal(dot){
  if (calculator.waitingForSecondOperand === true) {
  	calculator.displayValue = '0.'
    calculator.waitingForSecondOperand = false;
    return
  }
  //if 'displayValue' property does not contain a decimal point
  if(!calculator.displayValue.includes(dot)){
  //append the decimal point
    calculator.displayValue += dot;
  }
}

//function to handle operators
function handleOperator(nextOperator){
  //destructure properties on calculator object
  const { firstOperand, displayValue, operator } = calculator
  //'parseFloat' converts the string contents of 'displayValue'
  //to floating-point number
  const inputValue = parseFloat(displayValue);

  if(operator && calculator.waitingForSecondOperand){
    calculator.operator = nextOperator;
    console.log(calculator);
    return;
  }

  //verify that 'firstOperand' is null and that the 'inputValue'
  //is not a 'Nan' value
  if(firstOperand === null && !isNaN(inputValue)){
    //update the firstOperand property
    calculator.firstOperand = inputValue;
  } else if(operator){
    const result = calculate(firstOperand, inputValue, operator);

    calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
    calculator.firstOperand = result;
  }

  calculator.waitingForSecondOperand = true;
  calculator.operator = nextOperator;
  
  console.log(calculator);
}

function calculate(firstOperand, secondOperand, operator) {
  if (operator === '+') {
    return firstOperand + secondOperand;
  } else if (operator === '-') {
    return firstOperand - secondOperand;
  } else if (operator === '*') {
    return firstOperand * secondOperand;
  } else if (operator === '/') {
    return firstOperand / secondOperand;
  }

  return secondOperand;
}

//function for resetting calculator
function resetCalculator() {
  calculator.displayValue = '0';
  calculator.firstOperand = null;
  calculator.waitingForSecondOperand = false;
  calculator.operator = null;
  console.log(calculator);
}

//function to update display on calculator
function updateDisplay(){
  //select element with class of 'calculator-screen'
  const display = document.querySelector('.calculator-screen');
  //update value of element with contents of 'display value'
  display.value = calculator.displayValue;
}

updateDisplay();

//event listeners for key presses
const keys = document.querySelector('.calculator-keys');
keys.addEventListener('click', (event) => {
  // access element that is clicked
  const { target } = event;

  //check if clicked element is a button
  //if not, exit function
  if(!target.matches('button')){
    return;
  }

  if(target.classList.contains('operator')){
    handleOperator(target.value);
    updateDisplay();
    return;
  }

  if(target.classList.contains('decimal')){
    inputDigit(target.value);
    updateDisplay()
    return;
  }

  if(target.classList.contains('all-clear')){
    resetCalculator();
    updateDisplay();
    return;
  }

  inputDigit(target.value);
  updateDisplay();
});