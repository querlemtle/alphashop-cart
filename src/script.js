import "./scss/main.scss"

const btnContainer = document.querySelector(".button-container");
const btnPrevious = document.querySelector(".btn-previous");
const btnNext = document.querySelector(".btn-next");
const stepNodes = document.querySelectorAll(".step");
const formSectionNodes = document.querySelectorAll(".form-section");
const formRadioSection = document.querySelector(`.form-section[data-section="radio"]`);
const card = document.querySelector(".card");

let step = 0;
let cart = [
  {
    id: 1,
    amount: 1
  },
  {
    id: 2,
    amount: 1
  }
];

toggleBtnDisplay();
btnContainer.addEventListener("click", changeSteps);
formRadioSection.addEventListener("change", toggleRadioInput);
card.addEventListener("click", changeAmount);

// change radio option border upon selecting / deselecting
function toggleRadioInput(event) {
  const radioInputNodes = document.querySelectorAll(`input[type="radio"]`);
  radioInputNodes.forEach(radio => {
    radio.closest(".radio-option").classList.add("disabled");
  });
  event.target.closest(".radio-option").classList.remove("disabled");
}

// change step circle and form section status
function changeSteps(event) {
  const currentStep = stepNodes[step];
  if (event.target === btnNext && event.target.textContent === `下一步 →`) {
    const nextStep = stepNodes[step + 1];
    // change current and next step status
    currentStep.classList.remove("active");
    currentStep.classList.add("checked");
    nextStep.classList.remove("disabled");
    nextStep.classList.add("active");
    // change form section
    formSectionNodes[step].classList.add("hide");
    formSectionNodes[step + 1].classList.remove("hide");
    step++;
  } else if (event.target === btnPrevious) {
    const prevStep = stepNodes[step - 1];
    // change current and previous step status
    currentStep.classList.remove("active");
    currentStep.classList.add("disabled");
    prevStep.classList.remove("checked");
    prevStep.classList.add("active");
    // change form section
    formSectionNodes[step].classList.add("hide");
    formSectionNodes[step - 1].classList.remove("hide");
    step--;
  }
  toggleBtnDisplay();
}

// hide or show previous button, change next button context depending on form status
function toggleBtnDisplay() {
  btnPrevious.style.display = (step === 0 ? "none" : "block");
  btnNext.textContent = (step === stepNodes.length - 1 ? "確認下單" : "下一步 →");
}

// change item amount on button clicked
function changeAmount(event) {
  const amountNode = event.target.parentElement.querySelector(".amount");
  const clickedId = +event.target.parentElement.dataset.id;
  let selectedItem = cart[cart.findIndex(item => item.id === clickedId)];
  if (event.target.matches(".btn-plus")) {
    selectedItem.amount++;
    amountNode.textContent = selectedItem.amount;
  } else if (event.target.matches(".btn-minus")) {
    selectedItem.amount--;
    selectedItem.amount <= 0 ? selectedItem.amount = 1 : selectedItem.amount;
    amountNode.textContent = selectedItem.amount;
  }
}