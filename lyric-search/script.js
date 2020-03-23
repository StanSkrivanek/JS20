const form = document.getElementById("form");
const search = document.getElementById("search");
const result = document.getElementById("result");
const more = document.getElementById("more");

const apiURL = "https://api.lyrics.ovh";

// Search by song or artist - event listener is on `form` element
async function searchSongs(term) {
  const res = await fetch(`${apiURL}/suggest/${term}`);
  const basedOnInput = await res.json();
  // console.log(basedOnInput);

  showData(basedOnInput); // execute search from input
}

// show song and artist in DOM
function showData(basedOnInput) {
  result.innerHTML = `
  <ul class="songs">

  ${basedOnInput.data
    //  key `data` is part of response (root arrray)
    // Object: (data: Array, total: num, next: url)

    .map(
      song => `<li>
      <img class="list-cover" src=${song.album.cover_small}>

    <div class="search-data">
      <h3>${song.artist.name}</h3>
      <small>${song.title}</small> 
      <div>
      <button class="btn lyrics-get" album="${song.album.title}"  cover="${song.album.cover}" audioPrev="${song.preview}" data-artist="${song.artist.name}" data-songtitle="${song.title}">Get Lyrics</button>
      </div>
    </div>
  </li>`
    )
    .join("")}
  </ul>
  `;

  if (basedOnInput.prev || basedOnInput.next) {
    more.innerHTML = `
      ${
        basedOnInput.prev
          ? `<button class="btn" onclick="getMoreSongs('${basedOnInput.prev}')">Prev</button>`
          : ""
      }
      ${
        basedOnInput.next
          ? `<button class="btn" onclick="getMoreSongs('${basedOnInput.next}')">Next</button>`
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
  // console.log(data);
  showData(data);
}

// GET lyrics for song
async function getLyrics(
  artist,
  songTitle,
  clickedEl,
  cover,
  album,
  audioPrev
) {
  const res = await fetch(`${apiURL}/v1/${artist}/${songTitle}}`);
  // console.log(res);
  if (res.status === 404) {
    clickedEl.className = "btn not-found";
    clickedEl.innerText = "No Lyrics yet";
  } else {
    const data = await res.json();
    // console.log(data);

    // use REGEX (/ /) - check for return `r` and new line `n` or just `r` or just `n` and check whole data (don't stop after first match) with global flag `g`. when Match if found, replace it with line break `<br>`
    const lyrics = data.lyrics.replace(/(\r\n|\n\n)/g, "<br>");
    // const lyrics = data.lyrics;
    // place it into page
    result.innerHTML = `
    <div class="lyric-header">
      <img src="${cover}" class="list-cover">
      <div class="lyric-header__data">
        <small>Artist:</small>
        <h2>${artist}</h2>
        <small>Album:</small>
        <h3>${album}</h3>
      </div>
      <div>
      </div>
    </div>
    <div class="lyrics-container">
      <h2>${songTitle}</h2>
      <audio src="${audioPrev}" controls ></audio>
      <div class="lyrics">${lyrics}</div>
    </div>
    `;

    // clear `more` section
    more.innerHTML = "";
  }
}

// ======================================================== EVENT LISTENERS

// --- Search input term
form.addEventListener("submit", e => {
  e.preventDefault();
  // trim -> trim white space
  const searchTerm = search.value.trim();
  // console.log(object);
  if (!searchTerm) {
    // if search field is empty show error (alert)
    return alert("Please type in a search field some term");
    // result.innerHTML += `<small>Please type in a search field some term</small>`;
  } else {
    searchSongs(searchTerm);
  }
});

// --- Search lyrics
// Because button for getting lyrics is genereted by javaScript we have to add event listener on its parent element (`div` with ID `result)ant than point to element we want target by `tagName`

// if contition its up to you it can be `id`, `class` etc.
// using `tagName` - For DOM trees which represent HTML documents, the returned tag name is always in the canonical upper-case form. For example, tagName called on a <div> element returns "DIV".

// button have custom attributes `data-artist` and `data-songtitle`. Data stored in these attributes will be conditions (artist - song name) to find result (lyrics ...)

result.addEventListener("click", e => {
  // console.log(e.target); // button.btn
  const clickedEl = e.target;
  // console.log(e.target);

  // optionally:  (clickedEl.tagName === "BUTTON")

  const artist = clickedEl.getAttribute("data-artist");
  const songTitle = clickedEl.getAttribute("data-songtitle");
  const cover = clickedEl.getAttribute("cover");
  const album = clickedEl.getAttribute("album");
  const audioPrev = clickedEl.getAttribute("audioPrev");

  // console.log(album);
  if (clickedEl.tagName === "BUTTON") {
    getLyrics(artist, songTitle, clickedEl, cover, album, audioPrev);
  }
});
