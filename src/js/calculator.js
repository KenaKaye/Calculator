const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');
const clearButton = document.getElementById('clear');
const equalsButton = document.getElementById('equals');

let currentInput = '';
let previousInput = '';
let operator = '';
let resultCalculated = false;

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.getAttribute('data-value');

    if (resultCalculated) {
      if (['+', '-', '*', '/'].includes(value)) {
        previousInput = currentInput;
        operator = value;
        currentInput = '';
        resultCalculated = false; 
      } else {
        currentInput = value;
        display.value = currentInput;
        resultCalculated = false; 
      }
    } else {
      
      if (['+', '-', '*', '/'].includes(value)) {
        if (currentInput !== '') {
          previousInput = currentInput;
          currentInput = '';
        }
        operator = value;
        display.value = previousInput + operator;
      } else {
        
        currentInput += value;
        display.value = currentInput;
      }
    }
  });
});

clearButton.addEventListener('click', () => {
  currentInput = '';
  previousInput = '';
  operator = '';
  display.value = '';
  resultCalculated = false;
});

equalsButton.addEventListener('click', () => {
  if (previousInput !== '' && currentInput !== '') {
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    switch (operator) {
      case '+':
        result = prev + current;
        break;
      case '-':
        result = prev - current;
        break;
      case '*':
        result = prev * current;
        break;
      case '/':
        if (current === 0) {
          result = 'Error';
          display.value = result;
          return;
        } else {
          result = prev / current;
        }
        break;
      default:
        result = 'Error';
        break;
    }

    currentInput = result.toString();
    display.value = currentInput;
    previousInput = '';
    operator = '';
    resultCalculated = true;
  }
});

buttons.forEach(button => {
  const value = button.getAttribute('data-value');
  if (value === '.') {
    button.addEventListener('click', () => {
      
      if (!currentInput.includes('.')) {
        currentInput += '.';
        display.value = currentInput;
      }
    });
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    equalsButton.click();
  } else if (event.key === 'Backspace') {
    event.preventDefault();
    backspaceButton.click();
  } else if ('0123456789+-*/.'.includes(event.key)) {
    const button = Array.from(buttons).find(btn => btn.getAttribute('data-value') === event.key);
    if (button) button.click();
  }
});