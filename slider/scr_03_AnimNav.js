// get slides from container
const [...slides] = document.querySelectorAll("#fds-slides_wrap .fds-slide");
const sliderNavContainer = document.querySelector("#fds-slider-navContainer");

let currentSlide = 0;

const slideInterval = setInterval(showSlide, 3000);
if (slides.length >= 1) {
  createPagination(slides);
}

// [ === CLICK === ]
// invoke `thisSlide()` function on click event listener
function showThisSlide() {
  slides[currentSlide].className = "fds-slide";
  currentSlide = (currentSlide + 1) % slides.length;
  slides[currentSlide].className = "fds-slide is-visible";
}

// show current (next/prev) slide
function showSlide() {
  slides[currentSlide].className = "fds-slide";
  currentSlide = (currentSlide + 1) % slides.length;
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
      // console.log(item);
      return `<li id="${idx}" class="fds-nav-item${
        item.className === "fds-slide is-visible" ? " selected" : ""
      }"><a href="#">${idx + 1}</a></li>`;
    })
    .join("")}
  </ol>`;
}

sliderNavContainer.addEventListener("click", (event) => {
  const clickedEl = event.target;
  // const id = clickedEl.parentElement.id;
  const [...list] = sliderNavContainer.children[0].children;
  list.forEach((item) => item.classList.remove("selected"));
  clickedEl.parentElement.classList.add("selected");
  showThisSlide();
});
