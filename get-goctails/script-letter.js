const footer = document.querySelector("#footer");
const result = document.querySelector("#result");
const azWrapper = document.querySelector("#az-wrapper");
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

// Get data from API URL (run from event listener)
async function getByLetter(url) {
  const dataJSON = await (await fetch(`${url}`)).json();
  // console.log(dataJSON);
  const drinkJSON = dataJSON.drinks;
  // console.log(drinkJSON);
  addDrinksToDOM(drinkJSON);
}

// add data into DOM
function addDrinksToDOM(data) {
  // console.log(data);
  result.innerHTML = `
  <div class="thumbs_wrapper">
${data
  .map(
    drink => `
    
      <div class="thumbnail">
        <img src="${drink.strDrinkThumb}">
        <p>${drink.strDrink}</p>
      </div>
      `
  )
  .join("")}
      </div>
`;
}

// Generate Alphabeth
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

// Add alphabeth into DOM

azWrapper.innerHTML = `
<ul>
${generateLetter(alphabeth)}
</ul>`;

azWrapper.addEventListener("click", e => {
  const clickedEl = e.target;
  // console.log(clickedEl);
  const url = clickedEl.getAttribute("url");
  // console.log(url);

  if (clickedEl.tagName === "LI") {
    getByLetter(url);
  }
});
