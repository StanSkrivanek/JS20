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

// Update DOM
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

// double everyones money
function doubleMoney() {
  dataArr = dataArr.map(user => {
    return { ...user, money: user.money * 2 };
  });

  updateDOM();
}

// event listeners
addUserBtn.addEventListener("click", getRandomUser);
doubleBtn.addEventListener("click", doubleMoney);