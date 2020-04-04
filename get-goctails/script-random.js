const result = document.querySelector("#result");
const footer = document.querySelector("#footer");
const someDrink = document.querySelector("#random");

// This code return random drink.
// one problem in this API is to sort 15 ingredients and measures as they aren't in Array [common practice]. These properties have number after name as differentiator Instead.

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

function addDrinkToDOM(drinkData) {
  const data = drinkData[0];
  const drinks = [];
  for (let i = 1; i <= 15; i++) {
    if (data[`strIngredient${i}`] !== null) {
      drinks.push(
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
  result.innerHTML = `${drinkData.map(
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
   ${drinks.map(item => `<small>${item}</small>`).join("")}
  </div>
  </div>
  `
  )}
  `;
}
