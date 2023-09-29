const submitButton = document.getElementById("submit");
const firstDigitField = document.getElementById("firstNumber");
const secondDigitField = document.getElementById("secondNumber");
const input = document.getElementById('counterInput')

function randomDigit(max) {
  return Math.floor((Math.random() * max)+100);
}

const timerField = document.getElementById('timerField')
let time = 0
function timerOn () {
  setInterval(() => 
  (time+=1),
  1000);  
}

let firstDigitRoot = randomDigit(899);
let secondDigitRoot = randomDigit(899);
firstDigitField.textContent = firstDigitRoot;
secondDigitField.textContent = secondDigitRoot;
console.log(firstDigitRoot+secondDigitRoot)

timerOn()
function timeExposer () {
  timerField.textContent = time
}
setInterval(timeExposer, 1000)

input.addEventListener('keyup', (e) => {
  if(e.key === "Enter") {
    if(firstDigitRoot + secondDigitRoot == input.value) {
      let firstDigit = randomDigit(899);
      let secondDigit = randomDigit(899);
      firstDigitField.textContent = firstDigit;
      secondDigitField.textContent = secondDigit;
      firstDigitRoot = firstDigit;
      secondDigitRoot = secondDigit;
      console.log(firstDigitRoot+secondDigitRoot)
      input.value=''
      input.classList.remove("incorrect")
      time=0
    }
    else {    
      input.classList.add("incorrect")
    }
  }
})

