const inputsCheackbox = document.querySelectorAll(".container-custom-checkbox input");
const ingredients = document.querySelectorAll(".current-pizza-item");
const drinks = document.querySelectorAll(".select-drink-item");
const totalAmount = document.querySelector(".total-amount .summa");
const orderBtn = document.querySelector(".typical-btn");
const modalWindow = document.querySelector(".modal-window");
const submitBtn = document.querySelector(".modal-window__submit-btn");

const subject = document.querySelector(".modal-window__subject");
const ingredientsSpan = document.querySelector(".modal-window__ingredients");
const drinksSpan = document.querySelector(".modal-window__drinks");

/* Additing ingredients to pizza*/
function addIngredients (cheackboxes) {
  const cheackboxesArray = Array.from(cheackboxes);
  const ingredientsArray = Array.from(ingredients);
  ingredientsArray.splice(0, 2); 
  for (let i = 0; i < cheackboxesArray.length; i++) {
    let cheackbox = cheackboxesArray[i];
    cheackbox.addEventListener("click", function (event) {
      this.closest(".container-custom-checkbox").classList.toggle("active"); 
      const index = cheackboxesArray.indexOf(this); 
      ingredientsArray[index].classList.toggle("active");
      calculate();
    })
  }
}
addIngredients(inputsCheackbox);

/* Additing drinks */

function addDrinks (drinksItems) {
  drinksItems.forEach(function (drinkItem) {
    drinkItem.addEventListener("click", function (event) {
      this.classList.toggle("active");
      calculate();
    })
  })
}
addDrinks(drinks);

/* Calculate order */

function calculate () {
  const ingredientsActive = document.querySelectorAll(".container-custom-checkbox.active"); 
  const drinksActive = document.querySelectorAll(".select-drink-item.active");

  const startPrice = 300;
  const ingredientsPrice = ingredientsActive.length * 25;
  const drinksPrice = drinksActive.length * 95;
  totalAmount.innerHTML = `${startPrice + ingredientsPrice + drinksPrice}₽`;
}

/* Modal window for order */

orderBtn.addEventListener("click", function () {
  modalWindow.classList.remove("none");

  prepareWindowModalContent();

  submitBtn.addEventListener("click", function () {
    modalWindow.classList.add("none");
  })
})

function prepareWindowModalContent () {
  subject.innerHTML = "";
  ingredientsSpan.innerHTML = "";
  drinksSpan.innerHTML = "";
  const addIngredientsActive = document.querySelectorAll(".container-custom-checkbox.active");
  const addDrinksActive = document.querySelectorAll(".select-drink-item.active");

  let ingredientsList = [];

  if (addIngredientsActive) {
    for (let ingredient of addIngredientsActive) {
      ingredientsList.push(ingredient.innerText);
    }
  }
  let drinksList = [];
  if (addDrinksActive) {
    for (let drink of addDrinksActive) {
      drinksList.push(drink.dataset.name);
    }
  }

  const totalIngredients = ingredientsList.join(", ") || "нет ингредиентов";
  const totalDrinks = drinksList.join(", ") || "нет напитков";
  const totalText = `Вы заказали пиццу с ингредиентами: ${totalIngredients}. А так же напитки: ${totalDrinks}. С вас ${totalAmount.innerHTML}`;
  subject.innerHTML = totalText;
}

