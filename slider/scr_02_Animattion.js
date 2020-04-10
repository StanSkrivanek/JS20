// get slides from container
const [...slides] = document.querySelectorAll("#fds-slides_wrap .fds-slide");
const sliderNavContainer = document.querySelector("#fds-slider-navContainer");
// const sliderContainer = document.querySelector("#fds-slider-container");
// console.dir(slides);
// keep track of the current slide
let currentSlide = 0;
// creating an interval to show the next slide
// const slideInterval = setInterval(nextSlide, 3000);

if (slides.length >= 1) createPagination(slides);

function nextSlide() {
  // change the current slide’s class so it’s not showing
  slides[currentSlide].className = "fds-slide";
  // add one to the current slide, and use the % operator to cycle back to zero if is reached the end of the slides (1%3 = 1 2%3 =2 3%3 = 0 4%3 = 1 5%3 = 2 ...)
  currentSlide = (currentSlide + 1) % slides.length;
  // add class to current slide
  slides[currentSlide].className = "fds-slide is-visible";
}

function thisSlide(id) {
  slides[currentSlide].className = "fds-slide";
  // show slide based on nav id number
  currentSlide = id;
  // add class to current slide
  slides[currentSlide].className = "fds-slide is-visible";
}

function createPagination(slides) {
  sliderNavContainer.innerHTML = `
  <ol class='fds-slider-navigation'>
  ${slides
    .map(
      (item, idx) =>
        `<li id="${idx}" class="fds-nav-item${
          idx === 0 ? " selected" : ""
        }"><a href="#">${idx + 1}</a></li>`
    )
    .join("")}
  </ol>`;
}

sliderNavContainer.addEventListener("click", (event) => {
  // event.preventDefault();

  const clickedEl = event.target;
  const id = clickedEl.parentElement.id;
  const [...list] = sliderNavContainer.children[0].children;
  list.forEach((item) => item.classList.remove("selected"));
  clickedEl.parentElement.classList.add("selected");
  thisSlide(id);
});
