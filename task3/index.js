const MAX_NUMBER = 99999;
const MIN_NUMBER = 1000;

const form = document.querySelector("#number_form");
const userInput = form.querySelector("#number_input");
const attemptsCount = document.querySelector("#attempts_output");
const numberSubmitBtn = document.querySelector("#number_submit_btn");
const outPlaceOutput = document.querySelector("#matching_out_place_output");
const inPlaceOutput = document.querySelector("#matching_in_place_output");

let attempts = 5;

const getRandomNum = () => Math.floor(Math.random() * (MAX_NUMBER - MIN_NUMBER) + MIN_NUMBER);
const goalNumber = getRandomNum();
const goalNumberArray = goalNumber.toString().split("");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!userInput.value.trim()) {
    alert("Значение не должно быть пустым!");
    return;
  }

  makeOneAttempt();
  decrementAttempts();
});

function decrementAttempts() {
  attempts--;
  attemptsCount.textContent = attempts;

  if (attempts === 0) {
    numberSubmitBtn.disabled = true;
    alert("Попыток больше нет :(");
    window.location.reload();
  }
}

function makeOneAttempt() {
  const userNumber = Number(userInput.value);
  const userNumberArray = userInput.value.split("");

  if (userNumber === goalNumber) {
    numberSubmitBtn.disabled = true;
    alert("WIN!");
    window.location.reload();
  }

  let inPlace = [];
  let outPlace = [];

  userNumberArray.forEach((num, index) => {
    if (num == goalNumberArray[index]) {
      inPlace.push(num);
    } else if (goalNumberArray.includes(num)) {
      outPlace.push(num);
    }
  });

  const amountMatchNumbersOutPlace = outPlace.length;
  outPlaceOutput.textContent = `${amountMatchNumbersOutPlace} (${outPlace.join(", ")})`;

  const amountMatchNumbersInPlace = inPlace.length;
  inPlaceOutput.textContent = `${amountMatchNumbersInPlace} (${inPlace.join(", ")})`;
}
