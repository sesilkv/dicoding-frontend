// object
const calculator = {
  displayNumber: '0',
  operator: null,
  firstNumber: null,
  waitingForSecondNumber: false 
};

function updateDisplay() {
  document.querySelector("#displayNumber").innerText = calculator.displayNumber;
}

function clearCalculator() {
  calculator.displayNumber = '0';
  calculator.operator = null;
  calculator.firstNumber= null;
  calculator.waitingForSecondNumber = false;
}

// input
function inputDigit(digit) {
  calculator.displayNumber += digit;
}

// perkalian displayNumber dengan -1
function inverseNumber() {
  if(calculator.displayNumber === '0'){
    return;
  }
  calculator.displayNumber = calculator.displayNumber * -1;
}

function handleOperator(operator) {
  if (!calculator.waitingForSecondNumber) {
    calculator.operator = operator;
    calculator.waitingForSecondNumber = true;
    calculator.firstNumber = calculator.displayNumber;

    // reset nilai displayNumber agar tombol selanjutkan dimulai dari angka pertama lagi
    calculator.displayNumber = '0';
  } else {
    alert('Operator sudah ditetapkan');
  }
}

function performCalculation() {
  if (calculator.firstNumber == null || calculator.operator == null) {
    alert('Anda belum menetapkan operator');
    return;
  }

  // parseInt() untuk mengubah nilai string menjadi number
  let result = 0;
  if (calculator.operator === "+") {
    result = parseInt(calculator.firstNumber) + parseInt(calculator.displayNumber);
  } else {
    result = parseInt(calculator.firstNumber) - parseInt(calculator.displayNumber);
  }

  calculator.displayNumber = result;
}

// get nilai elemen button
const buttons = document.querySelectorAll(".button");

for (let button of buttons) {
  // EVENT HANDLER
  button.addEventListener('click', function(event) {
    // mendapat objek elemen yg diklik
    const target = event.target;

    //event.classList: lihat nilai class apa saja dalam array (di dalam element target)
    //contains(): method array untuk memastikan nilai yang terkandung di array
    if(target.classList.contains('clear')) {
      clearCalculator();
      updateDisplay();
      return; //agar kode yg di bawah tidak ikut tereksekusi
    }

    if(target.classList.contains('negative')) {
      inverseNumber();
      updateDisplay();
      return;
    }

    if(target.classList.contains('operator')) {
      handleOperator(target.innerText);
      return;
    }

    if(target.classList.contains('equals')) {
      performCalculation();
      updateDisplay();
      return;
    }

    inputDigit(target.innerText);
    updateDisplay();
  });
}

// angka yg diinput akan menggantikan nilai displayNumber
function inputDigit(digit) {
  if(calculator.displayNumber === '0') {
    calculator.displayNumber = digit;
  } else {
    calculator.displayNumber += digit;
  }
}

