const submitButton = document.getElementById("submit");
const firstDigitField = document.getElementById("firstNumber");
const secondDigitField = document.getElementById("secondNumber");
const input = document.getElementById('counterInput')
let time = 0

function timerOn () {
  setInterval(() => 
    time+=1, 
    1000);
}

function timerOff () {
  clearInterval(timerOn)
}

function randomDigit(max) {
  return Math.floor((Math.random() * max)+100);
}

let firstDigitRoot = randomDigit(899);
let secondDigitRoot = randomDigit(899);
firstDigitField.textContent = firstDigitRoot;
secondDigitField.textContent = secondDigitRoot;

console.log(firstDigitRoot+secondDigitRoot)

timerOn()
input.addEventListener('keyup', (e) => {
  if(e.key === "Enter") {
    console.log('first if is on')
    console.log(firstDigitRoot+secondDigitRoot)
    if(firstDigitRoot + secondDigitRoot == input.value) {
      console.log('second if is on')
      let firstDigit = randomDigit(899);
      let secondDigit = randomDigit(899);
      console.log(firstDigit, secondDigit)
      firstDigitField.textContent = firstDigit;
      secondDigitField.textContent = secondDigit;
      firstDigitRoot = firstDigit;
      secondDigitRoot = secondDigit;
      console.log(firstDigitRoot+secondDigitRoot)
      input.value=''
      input.classList.remove("incorrect")
      timerOff();
      timerOn()
    }
    else {    
      input.classList.add("incorrect")
    }
  }
})

