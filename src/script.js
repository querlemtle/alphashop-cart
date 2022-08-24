import "./scss/main.scss"

// select mobile and desktop darkmode icons
const darkmodeIcons = document.querySelectorAll(`[data-icon="darkmode-icon"]`);
// select control step buttons
const btnContainer = document.querySelector(".button-container");
const btnPrevious = document.querySelector(".btn-previous");
const btnNext = document.querySelector(".btn-next");
const stepNodes = document.querySelectorAll(".step");
const formSectionNodes = document.querySelectorAll(".form-section");
const formRadioSection = document.querySelector(`.form-section[data-section="radio"]`);
const card = document.querySelector(".card");
const sumNode = document.getElementById("sum");
const root = document.documentElement;

let step = 0;
let shippingPriceString = "";
let cart = [
  {
    id: 1,
    amount: 1,
    unitPrice: 3999,
    get calculatedPrice() {
      return this.unitPrice * this.amount;
    } 
  },
  {
    id: 2,
    amount: 1,
    unitPrice: 1299,
    get calculatedPrice() {
      return this.unitPrice * this.amount;
    } 
  },
];

let sumCartPrice = function() {
  let sum = 0;
  for (const item of cart) {
    sum += item.unitPrice * item.amount;
  }
  sum += convertTextToPrice(shippingPriceString);
  return sum;
}

initializeTheme();
toggleBtnDisplay();
btnContainer.addEventListener("click", changeSteps);
formRadioSection.addEventListener("change", toggleRadioInput);
card.addEventListener("click", updateCart);
darkmodeIcons.forEach(icon => icon.addEventListener("click", switchThemes));

// get page theme from localStorage
function initializeTheme() {
  const theme = localStorage.getItem("theme");
  root.classList[theme === "dark" ? "add" : "remove"]("dark");
}

// format price display on the page
function formatPriceDisplay(price) {
  if (price === 0) {
    return "免費";
  } else {
    price = price.toString();
    if (price.length > 3) {
      // if more than 3-digits, add $ to the beginning of price, and add <,> as thousand separator
      const formattedPrice = "$" + price.slice(0, price.length - 3) + "," + price.slice(-3);
      return formattedPrice;
    } else {
      // if 3 or less digits, add $ to the beginning of price
      const formattedPrice = "$" + price;
      return formattedPrice;
    }
  }
}

// convert text content to price(number)
function convertTextToPrice(text) {
  if (text === "免費") {
    return 0;
  } else if (text.length <= 4) {
    // for 3 or less digits
    const convertedPrice = text.substring(1);
    return +convertedPrice;
  } else {
    // for 4 or more digits
    const convertedPrice = text.slice(1, text.length - 4) + text.slice(-3);
    return +convertedPrice;
  }
}

// change radio option border upon selecting / deselecting, also update the shipping fee in the cart
function toggleRadioInput(event) {
  const radioInputNodes = document.querySelectorAll(`input[type="radio"]`);
  radioInputNodes.forEach(radio => {
    radio.closest(".radio-option").classList.add("disabled");
  });
  event.target.closest(".radio-option").classList.remove("disabled");
  // update shipping fee in the cart
  const shippingNode = document.getElementById("shipping-price");
  shippingPriceString = event.target.closest(".radio-option").querySelector(".shipping-price").textContent;
  shippingNode.textContent = shippingPriceString;
  // re-calculate the total price
  sumNode.textContent = formatPriceDisplay(sumCartPrice(cart));
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

// update cart status on button clicked
function updateCart(event) {
  const selectedAmountNode = event.target.parentElement.querySelector(".amount");
  const selectedPriceNode = event.target.closest(".item-detail-wrapper").querySelector(".price");
  const clickedId = +event.target.parentElement.dataset.id;
  let selectedItem = cart[cart.findIndex(item => item.id === clickedId)];

  if (event.target.matches(".btn-plus")) {
    // update selected item amount
    selectedItem.amount++;
    selectedAmountNode.textContent = selectedItem.amount;
  } else if (event.target.matches(".btn-minus")) {
    selectedItem.amount--;
    // minimal amount is 1
    selectedItem.amount <= 0 ? selectedItem.amount = 1 : selectedItem.amount;
    selectedAmountNode.textContent = selectedItem.amount;
  }
  // update selected item price
  selectedPriceNode.textContent = formatPriceDisplay(selectedItem.calculatedPrice);
  // calculate and update the total price
  sumNode.textContent = formatPriceDisplay(sumCartPrice(cart));
}

// switch between light-theme and dark-theme
function switchThemes(event) {
  event.preventDefault();
  // toggle <html> dark class
  root.classList.toggle("dark");
  // Store selected theme to localStorage
  localStorage[root.classList.contains("dark") ? "setItem" : "removeItem"]("theme", "dark");
}