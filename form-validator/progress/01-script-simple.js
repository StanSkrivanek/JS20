// SIMPLE
const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

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

// add event listeners
form.addEventListener("submit", function(e) {
  // prevent from automatic submitt we will do submitt with our javaScript
  e.preventDefault();
  // condition
  if (username.value === "") {
    showError(username, "Username is Required");
  } else {
    showSuccess(username);
  }
  if (email.value === "") {
    showError(email, "Email is Required");
  } else if (!isValidEmail(email.value)) {
    showError(email, "Email is Not Valid");
  } else {
    showSuccess(email);
  }
  if (password.value === "") {
    showError(password, "Password is Required");
  } else {
    showSuccess(password);
  }
  if (password2.value === "") {
    showError(password2, "Confirm your password");
  } else {
    showSuccess(password2);
  }
  // console.log(username.value); // get value from field
});
