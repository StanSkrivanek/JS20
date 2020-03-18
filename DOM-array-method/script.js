const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const doubleBtn = document.getElementById("double");
const showMillionBtn = document.getElementById("show-milionaires");
const sortBtn = document.getElementById("sort");
const calcWealthBtn = document.getElementById("calculate-wealth");

// initialize array of objects` {name: string, money: num}
let dataArr = [];

getRandomUser();
// fetch random user and add money
async function getRandomUser() {
  const res = await fetch("https://uinames.com/api/");
  const data = await res.json();
  const user = data;

  const newUser = {
    fullName: `${user.name} ${user.surname}`,
    money: Math.floor(Math.random() * 1000000)
  };
  addData(newUser);
}

// Ass new obj to data array
function addData(obj) {
  dataArr.push(obj);
  updateDOM();
}

// Update DOM - by FOREACH
function updateDOM(provideData = dataArr) {
  // clear main div
  main.innerHTML = "<h2><strong>Person</strong>Wealth</h2>";

  provideData.forEach(item => {
    const element = document.createElement("div");
    element.classList.add("person");
    element.innerHTML = `<strong>${item.fullName}</strong> ${formatMoney(
      item.money
    )}`;
    main.appendChild(element);
  });
}
// Format number as money - https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-string
function formatMoney(number) {
  return "$ " + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

// double everyones money - by MAP
function doubleMoney() {
  dataArr = dataArr.map(user => {
    return { ...user, money: user.money * 2 };
  });
  updateDOM();
}

// Sort by Richest by SORT
function sortByRichest() {
  dataArr.sort((a, b) => b.money - a.money);
  updateDOM();
}

// show only milioniares - by FILTER
function showMillionares() {
  dataArr = dataArr.filter(user => user.money > 1000000);
  updateDOM();
}

// sum all money - by REDUCE
function calculateAllWealth() {
  const wealth = dataArr.reduce((acc, user) => (acc += user.money), 0);

  console.log(wealth);

  const wealthEl = document.createElement("div");
  wealthEl.innerHTML = `<h3 class="total">Total Wealth: <strong class="totalCount">${formatMoney(
    wealth
  )}</strong></h3>`;

  main.appendChild(wealthEl);
}
// event listeners
addUserBtn.addEventListener("click", getRandomUser);
doubleBtn.addEventListener("click", doubleMoney);
sortBtn.addEventListener("click", sortByRichest);
showMillionBtn.addEventListener("click", showMillionares);
calcWealthBtn.addEventListener("click", calculateAllWealth);
