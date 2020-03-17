// SIMPLE
const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmation = document.getElementById("confirmation");

// Show input error msg
function showError(input, message) {
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

// make id first letter Uppercase
function getFieldName(input) {
  // make letter on first position uppercase and concatenate rest without first letter
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

// email validation https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess;
  } else {
    showError(input, "Email is not valid");
  }
}

// check length of input
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be less than ${max} characters`
    );
  } else {
    showSuccess(input);
  }
}

// check password match
function checkPasswordMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, " Passwords do not match");
  }
}

// add event listeners
form.addEventListener("submit", function(e) {
  e.preventDefault();

  checkRequired([username, email, password, confirmation]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 15);
  checkEmail(email);
  checkPasswordMatch(password, confirmation);
});
