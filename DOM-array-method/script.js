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
  // const res = await fetch("https://uinames.com/api/?amount=7");
  const data = await res.json();
  // console.log(data);
  const user = data;
  // const user = data[0];

  const newUser = {
    fullName: `${user.name} ${user.surname}`,
    money: Math.floor(Math.random() * 1000000)
  };
  addData(newUser);
  // console.log(newUser);
}

// Ass new obj to data array
function addData(obj) {
  dataArr.push(obj);
}
console.log("dataArr:", dataArr);
