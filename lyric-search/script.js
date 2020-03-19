const form = document.getElementById("form");
const search = document.getElementById("search");
const result = document.getElementById("result");
const more = document.getElementById("more");

const apiURL = "https://api.lyrics.ovh";

// Search by song or artist
async function searchSongs(term) {
  const res = await fetch(`${apiURL}/suggest/${term}`);
  const data = await res.json();

  showData(data);
}

// show song and artist in DOM
function showData(data) {
  result.innerHTML = `
  <ul class="songs">
  ${data.data
    //  key `data` is part of response (arrray)
    .map(
      song => `<li>
  <span><strong>${song.artist.name}</strong> - ${song.title}</span> 
  <button class="btn" data-artist="${song.artist.name}" data-songtitle="${song.title}">Get Lyrics</button>
  </li>`
    )
    .join("")}
  </ul>
  `;

  if (data.prev || data.next) {
    more.innerHTML = `
      ${
        data.prev
          ? `<button class="btn" onclick="getMoreSongs('${data.prev}')">Prev</button>`
          : ""
      }
      ${
        data.next
          ? `<button class="btn" onclick="getMoreSongs('${data.next}')">Next</button>`
          : ""
      }
      `;
  } else {
    more.innerHTML = "";
  }
}

// Get prev or next songs
// Sort CORS problem https://github.com/Rob--W/cors-anywhere
// use URL `https://cors-anywhere.herokuapp.com` in front of your URL path

async function getMoreSongs(url) {
  const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
  const data = await res.json();

  showData(data);
}

// GET lyrics for song
async function getLyrics(artist, songTitle) {
  const res = await fetch(`${apiURL}/v1/${artist}/${songTitle}}`);
  const data = await res.json();
  // console.log(data);

  // use REGEX (/ /) - check for return `r` and new line `n` or just `r` or just `n` and check whole data (don't stop after first match) with global flag `g`. when Match if found, replace it with line break `<br>`
  const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, "<br>");

  // place it into page

  result.innerHTML = `<h2><strong>${artist}</strong> - ${songTitle}</h2><span>${lyrics}</span>`;
  // clear `more` section
  more.innerHTML = "";
}

// ======================================================== EVENT LISTENERS

// --- Search input term
form.addEventListener("submit", e => {
  e.preventDefault();
  // trim -> trim white space
  const searchTerm = search.value.trim();
  if (!searchTerm) {
    // if search field is empty show error (alert)
    alert("Please type in a search field some term");
  } else {
    searchSongs(searchTerm);
  }
});

// --- Search lyrics
// Because button for getting lyrics is genereted by javaScript we have to add event listener on its parent element (`div` with ID `result)

// if contition its up to you it can be `id`, `class` etc.
// using `tagName` - For DOM trees which represent HTML documents, the returned tag name is always in the canonical upper-case form. For example, tagName called on a <div> element returns "DIV".

// button have custom attributes `data-artist` and `data-songtitle`. Data stored in these attributes will be conditions (artist - song name) to find result (lyrics ...)

result.addEventListener("click", e => {
  // console.log(e.target); // button.btn
  const clickedEl = e.target;

  if (clickedEl.tagName === "BUTTON") {
    // console.log("BUTTON");
    const artist = clickedEl.getAttribute("data-artist");
    const songTitle = clickedEl.getAttribute("data-songtitle");

    getLyrics(artist, songTitle);
  }
});
