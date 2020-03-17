// SIMPLE
const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmation = document.getElementById("confirmation");

// Show input error msg
function showError(input, message) {
  // get parentElement of input
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const small = formControl.querySelector("small");
  small.innerText = message;
}

// Show input success
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

// email validation https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
function isValidEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
// make id first letter Uppercase
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Check Required Fields
function checkRequired(inputArr) {
  // Use high order Array method
  inputArr.forEach(function(input) {
    // console.log(input.value);
    if (input.value.trim() === "") {
      showError(input, `${getFieldName(input)} is Required`);
    } else {
      showSuccess(input);
    }
  });
}

// add event listeners
form.addEventListener("submit", function(e) {
  e.preventDefault();
  checkRequired([username, email, password, confirmation]);
});
