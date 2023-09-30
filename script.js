const submitButton = document.getElementById("submit");
const firstDigitField = document.getElementById("firstNumber");
const secondDigitField = document.getElementById("secondNumber");
const input = document.getElementById('counterInput')
const avgTimeField = document.getElementById('avgTimeField')
let avgTime = 0
let times = 0

function randomDigit(max) {
  return Math.floor((Math.random() * max)+100);
}

const timerField = document.getElementById('timerField')
let time = 0
function timerOn () {
  setInterval(() => 
  (time+=1),
  10);  
}

let firstDigitRoot = randomDigit(899);
let secondDigitRoot = randomDigit(899);
firstDigitField.textContent = firstDigitRoot;
secondDigitField.textContent = secondDigitRoot;
console.log(firstDigitRoot+secondDigitRoot)

timerOn()
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
      timerField.textContent = time/100
      avgTime+=(time/100)
      times+=1
      avgTimeField.textContent = (Math.round(avgTime / times * 100) / 100).toFixed(2)
      time=0
    }
    else {    
      input.classList.add("incorrect")
    }
  }
})

