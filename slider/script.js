// get slides from container
const mainContainer = document.querySelector("#fds-slider-container");
const sliderNavContainer = document.querySelector("#fds-slider-navContainer");
const [...slides] = document.querySelectorAll("#fds-slides_wrap .fds-slide");
// next / prev
const next = document.getElementById("next");
const previous = document.getElementById("prev");
let currentSlide = 0;

if (slides.length >= 1) {
  createPagination(slides);
}

// [ === CLICK - GO TO THIS === ]
// invoke `showThisSlide()` function on click event listener
function showThisSlide() {
  slides[currentSlide].className = "fds-slide";
  currentSlide = (currentSlide + 1) % slides.length;
  slides[currentSlide].className = "fds-slide is-visible";
}

// [ === CLICK - GO TO PREV / NEXT === ]

next.onclick = function () {
  // pauseSlides();
  nextSlide();
};

function nextSlide() {
  showSlide(currentSlide + 1);
}

previous.onclick = function () {
  // pauseSlides();
  prevSlide();
};

function prevSlide() {
  showSlide(currentSlide - 1);
}

// show current (next/prev) slide
function showSlide(num) {
  slides[currentSlide].className = "fds-slide";
  currentSlide = (num + slides.length) % slides.length;
  slides[currentSlide].className = "fds-slide is-visible";
  updateNav();
}

function updateNav() {
  // get nav LI'S
  let [...list] = sliderNavContainer.children[0].children;
  list.map((item, idx) => {
    item.classList.remove("selected");
    currentSlide === idx ? item.classList.add("selected") : "";
  });
  // try add to ternary as second condition `id` from button
}

// [ === PAGINATION === ]
// create slider navigation based on number of slides
function createPagination(slides) {
  sliderNavContainer.innerHTML = `
  <ol class='fds-slider-navigation'>
  ${slides
    .map((item, idx) => {
      return `<li id="${idx}" class="fds-nav-item${
        item.className === "fds-slide is-visible" ? " selected" : ""
      }"><a href="#">${idx + 1}</a></li>`;
    })
    .join("")}
  </ol>`;
}

// [ === KEYBOARD NAV === ]
// This functionality does not work as expected, How to fix it
// function keysNav(e) {
//   console.log(e.keyCode);
//   switch (e.keyCode) {
//     case 37:
//       pauseSlides();
//       setTimeout(playAgain, 7000);
//       prevSlide();
//       break;
//     case 39:
//       pauseSlides();
//       setTimeout(playAgain, 7000);
//       nextSlide();
//       break;
//     // case 32:
//     //   pauseSlides() == !pauseSlides();
//     //   break;
//   }
// }

// [ === EVENT LISTENERS === ]
sliderNavContainer.addEventListener("click", (event) => {
  const clickedEl = event.target;
  const [...list] = sliderNavContainer.children[0].children;

  list.forEach((item) => item.classList.remove("selected"));
  clickedEl.parentElement.classList.add("selected");
  showThisSlide();
});

let slideInterval = setInterval(nextSlide, 5000);

function playAgain() {
  slideInterval = setInterval(nextSlide, 5000);
}
function pauseSlides() {
  clearInterval(slideInterval);
}
mainContainer.addEventListener("mouseover", pauseSlides);
mainContainer.addEventListener("mouseout", playAgain);
// document.addEventListener("mouseover", pauseSlides);
// document.addEventListener("mouseout", playAgain);
// document.addEventListener("keydown", keysNav);
