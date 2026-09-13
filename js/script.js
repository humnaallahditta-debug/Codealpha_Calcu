
const previousOperandEl = document.getElementById('previousOperand');
const currentOperandEl = document.getElementById('currentOperand');
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const equalsBtn = document.getElementById('equalsBtn');
const clearBtn = document.getElementById('clearBtn');
const deleteBtn = document.getElementById('deleteBtn');


let currentOperand = '0';   
let previousOperand = '';   
let operation = undefined;  


function updateDisplay() {
  currentOperandEl.textContent = currentOperand;
  if (operation != null) {
    previousOperandEl.textContent = `${previousOperand} ${operation}`;
  } else {
    previousOperandEl.textContent = '';
  }
}


numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    const number = button.getAttribute('data-number');

    
    if (currentOperand === '0' && number !== '.') {
      currentOperand = number;
    } else if (number === '.' && currentOperand.includes('.')) {
      return; 
    } else {
      currentOperand += number;
    }

    updateDisplay();
  });
});


operatorButtons.forEach(button => {
  button.addEventListener('click', () => {
    if (currentOperand === '') return;

    
    if (previousOperand !== '') {
      calculate();
    }

    operation = button.getAttribute('data-operator');
    previousOperand = currentOperand;
    currentOperand = '0';
    updateDisplay();
  });
});


function calculate() {
  let result;
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);

  if (isNaN(prev) || isNaN(current)) return;

  switch (operation) {
    case '+':
      result = prev + current;
      break;
    case '-':
      result = prev - current;
      break;
    case '×':
      result = prev * current;
      break;
    case '÷':
      if (current === 0) {
        alert("Aap kisi number ko 0 se divide nahi kar sakte!");
        clear();
        return;
      }
      result = prev / current;
      break;
    default:
      return;
  }

  currentOperand = result.toString();
  operation = undefined;
  previousOperand = '';
}


equalsBtn.addEventListener('click', () => {
  if (operation == null || currentOperand === '') return;
  calculate();
  updateDisplay();
});


function clear() {
  currentOperand = '0';
  previousOperand = '';
  operation = undefined;
  updateDisplay();
}
clearBtn.addEventListener('click', clear);


deleteBtn.addEventListener('click', () => {
  if (currentOperand.length === 1) {
    currentOperand = '0';
  } else {
    currentOperand = currentOperand.slice(0, -1);
  }
  updateDisplay();
});


document.addEventListener('keydown', (e) => {
  if (e.key >= '0' && e.key <= '9') {
    document.querySelector(`[data-number="${e.key}"]`).click();
  }
  if (e.key === '.') {
    document.querySelector(`[data-number="."]`).click();
  }
  if (e.key === '+' ) document.querySelector(`[data-operator="+"]`).click();
  if (e.key === '-' ) document.querySelector(`[data-operator="-"]`).click();
  if (e.key === '*' ) document.querySelector(`[data-operator="×"]`).click();
  if (e.key === '/' ) { e.preventDefault(); document.querySelector(`[data-operator="÷"]`).click(); }
  if (e.key === 'Enter' || e.key === '=') equalsBtn.click();
  if (e.key === 'Backspace') deleteBtn.click();
  if (e.key === 'Escape') clearBtn.click();
});