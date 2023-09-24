const submitButton = document.getElementById("submit");
let firstDigitField = document.getElementById("firstNumber");
let secondDigitField = document.getElementById("secondNumber");
const input = document.getElementById('counterInput')

function randomDigit(max) {
  return Math.floor((Math.random() * max)+100);
}
for(let i=1; i<2; i++) {
  let firstDigit = randomDigit(899);
  let secondDigit = randomDigit(899);
  firstDigitField.textContent = firstDigit;
  secondDigitField.textContent = secondDigit;
}

console.log(input.value)


console.log(firstDigit+secondDigit)

input.addEventListener('keyup', (e) => {
  if(e.key === "Enter") {
    if(firstDigit + secondDigit == input.value) {
      let firstDigit = randomDigit(899);
      let secondDigit = randomDigit(899);
      console.log(firstDigit, secondDigit)
      firstDigitField.textContent = firstDigit;
      secondDigitField.textContent = secondDigit;}
  }
})

