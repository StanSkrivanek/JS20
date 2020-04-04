const result = document.querySelector("#result");
const footer = document.querySelector("#footer");
const someDrink = document.querySelector("#random");
const azWrapper = document.querySelector("#az-wrapper");
const modalContainer = document.querySelector("#modal-container");
// const close = document.querySelector("#close");

const alphabeth = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z"
];
// This code return random drink.
// one problem in this API is to sort 15 ingredients and measures as they aren't in Array [common practice]. These properties have number after name as differentiator Instead.

// =================================== ALPHABETH

function generateLetter(alphabeth) {
  const apiURL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?f=";
  return `${alphabeth
    .map(
      letter => `
    <li id="${letter}"  url="${apiURL}${letter}">
    ${letter}
    </li>
    `
    )
    .join("")}`;
}

azWrapper.innerHTML = `
<ul>
${generateLetter(alphabeth)}
</ul>`;

// =================================== RANDOM DRINK

const apiURL = "https://www.thecocktaildb.com/api/json/v1/1/random.php";

// const apiAlphabethURL =
// "https://www.thecocktaildb.com/api/json/v1/1/search.php?f=";
// const dataByLetter = await await fetch(`${apiAlphabethURL}${letter}`);

// returns data in JSON
async function jsonFromAPI() {
  const dataJSON = await (await fetch(`${apiURL}`)).json();
  const drinkJSON = dataJSON.drinks;
  addDrinkToDOM(drinkJSON);
}

function addDrinkToDOM(drinkJSON) {
  const data = drinkJSON[0];
  const ingAndVol = [];
  for (let i = 1; i <= 15; i++) {
    if (data[`strIngredient${i}`] !== null) {
      ingAndVol.push(
        `
        <span class="ingred">
        ${data[`strIngredient${i}`]}
        </span>
        <small class="measure">
        ${data[`strMeasure${i}`] === null ? "" : data[`strMeasure${i}`]}
        </small>
        `
      );
    }
  }
  // console.log(drinks);
  result.innerHTML = `${drinkJSON.map(
    drink => `
<div class="card">
  <div class="header">
    <h2>
      ${drink.strDrink}
    </h2>
  </div>
  <div class="basicInfo" >
    <img src="${drink.strDrinkThumb}" class="image" />
    </div>
    <div class="global_info">
      <small>Type: <span>${drink.strAlcoholic}</span></small><br>
      <small>Category: <span>${drink.strCategory}</span></small><br>
      <small>Glass: <span>${drink.strGlass}</span></small>
    </div>
  <div class="instruction">
    <h3>Instruction:</h3>
    <p>${drink.strInstructions}</p>
  </div>
  <div class="wrapper">
   ${ingAndVol.map(item => `<small>${item}</small>`).join("")}
  </div>
  </div>
  `
  )}
  `;
}

// =================================== DRINKS BY FIRST LETTER

// Get data from API URL (run from event listener)
async function getByLetter(LetterUrl) {
  const dataJSON = await (await fetch(`${LetterUrl}`)).json();
  // console.log(dataJSON);
  const drinksJSON = dataJSON.drinks;
  // console.log(drinksJSON);
  addThumbsToDOM(drinksJSON);
}

// add drinks based on first letter into DOM
function addThumbsToDOM(drinksMeta) {
  if (drinksMeta === null) {
    result.innerHTML = `<div class="error"><p> NO DRINK FOUND IN DB</p></div>`;
  }
  result.innerHTML = `
  <ul id="thumbsWrapper" class="thumbs_wrapper">
  ${drinksMeta
    .map(drink => {
      // dataForModal(drink);
      return `
      <li class="thumbnail">
      <img src="${drink.strDrinkThumb}" >
      <button  id="${drink.idDrink}" class="btn-toggle">${drink.strDrink} </button>
      </li>
      `;
    })
    .join("")}
    </ul>`;
}

async function getById(id) {
  const idURL = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";
  // console.log(idURL);
  const dataJSON = await (await fetch(`${idURL}${id}`)).json();
  // console.log(dataJSON);
  const drinkJSONModal = dataJSON.drinks;
  // console.log(drinkJSONModal);
  addDrinkToModal(drinkJSONModal);
}

// =================================== DRINKS MODAL
function addDrinkToModal(drinkJSONModal) {
  const data = drinkJSONModal[0];
  const ingAndVol = [];
  for (let i = 1; i <= 15; i++) {
    if (data[`strIngredient${i}`] !== null) {
      ingAndVol.push(
        `
        <span class="ingred">
        ${data[`strIngredient${i}`]}
        </span>
        <small class="measure">
        ${data[`strMeasure${i}`] === null ? "" : data[`strMeasure${i}`]}
        </small>
        `
      );
    }
  }
  // console.log(drinks);
  modal.innerHTML = `${drinkJSONModal.map(
    drink => `
<div class="card">
  <div class="header">
    <h2>
      ${drink.strDrink}
    </h2>
  </div>
  <div class="basicInfo" >
    <img src="${drink.strDrinkThumb}" class="image" />
    </div>
    <div class="global_info">
      <small>Type: <span>${drink.strAlcoholic}</span></small><br>
      <small>Category: <span>${drink.strCategory}</span></small><br>
      <small>Glass: <span>${drink.strGlass}</span></small>
    </div>
  <div class="instruction">
    <h3>Instruction:</h3>
    <p>${drink.strInstructions}</p>
  </div>
  <div class="wrapper">
   ${ingAndVol.map(item => `<small>${item}</small>`).join("")}
  </div>
  <button id="close" class="btn_random">close</button>
  </div>
  `
  )}
  `;

  const close = document.querySelector("#close");
  close.addEventListener("click", () =>
    modalContainer.classList.remove("show-modal")
  );
  // console.log(data.strInstructions);
}

// =================================== Event listerners

azWrapper.addEventListener("click", e => {
  const clickedEl = e.target;

  if (clickedEl.tagName === "LI") {
    const url = clickedEl.getAttribute("url");
    getByLetter(url);
  }
});

result.addEventListener("click", e => {
  const clickedEl = e.target;
  if (clickedEl.className === "btn-toggle") {
    const id = clickedEl.id;
    // const drinkIdURL = `"https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}"`;
    getById(id);
    modalContainer.classList.add("show-modal");
    // console.log(drinkIdURL);
  }
});

window.addEventListener("click", e =>
  e.target == modalContainer
    ? modalContainer.classList.remove("show-modal")
    : false
);
