const princessHolder = document.querySelector("#princess");

const knightHolder = document.querySelector("#knight");
const dragonHolder = document.querySelector("#dragon");

const btnPlay = document.querySelector("#btnPlay");

const modalWindow = document.querySelector("#modalWindow");
const modalContainer = document.querySelector("#modalContainer");

const reducer = (acc, curr) => acc + curr;

//
// ============== SOUND ==============
//
const audio = new Audio();
audio.volume = 0.6;

const princessPlaylist = [
  "./assets/sound/princess/princess-bravo-clap.mp3",
  "./assets/sound/princess/princess_bravo.mp3",
  "./assets/sound/princess/princess_my-her.mp3",
  "./assets/sound/princess/princess_ooh.mp3",
  "./assets/sound/princess/princess_ouch_01.mp3",
  "./assets/sound/princess/princess_ouch_02.mp3",
  "./assets/sound/princess/princess_ouch_ahh.mp3",
  "./assets/sound/princess/princess_yay.mp3",
];

// === === FUNCTIONS === ===

const playerHealth = 100;

let dragonsLife = [];
let knightsLife = [];

let charactersList = [
  // NOTE: images can be placed into array and then taken by index
  {
    type: "knight",
    damage: [],
    life: 100,
    initImg: "./assets/img/knight-ready.jpg",
    attackImg: "./assets/img/knight-action.jpg",
    winImg: "./assets/img/knight-win.png",
    sound: [
      "./assets/sound/knight/knight-sword_02.mp3",
      "./assets/sound/knight/knight-sword_01.mp3",
      "./assets/sound/knight/knight-sword_03.mp3",
    ],
  },
  {
    type: "dragon",
    damage: [],
    life: 100,
    initImg: "./assets/img/dragon-scared.jpg",
    attackImg: "./assets/img/dragon-fire.jpg",
    winImg: "./assets/img/dragon-win.png",
    sound: [
      "./assets/sound/dragon/2-3-10009.1.mp3",
      "./assets/sound/dragon/2-3-10009.3.mp3",
      "./assets/sound/dragon/2-3-10009.5.mp3",
      "./assets/sound/dragon/2-3-10009.6.mp3",
      "./assets/sound/dragon/Dragon_Roaring_and_breathe_fire.mp3",
    ],
  },
];

// === ATTACK
let playersAttack = (currentPlayer, defender, totalLife) => {
  const attack = Math.floor(Math.random() * 100); //?
  const attackProgBar = currentPlayer.querySelector(".attackProgBar");
  const image = currentPlayer.querySelector("img");
  const onAttack = charactersList.find((obj) => obj.type === currentPlayer.id);

  attackProgBar.style.width = attack + "%";
  image.src = onAttack.attackImg;
  audio.src = onAttack.sound[Math.floor(Math.random() * onAttack.sound.length)];
  audio.play();

  if (attack > 75) {
    setTimeout(() => princessSpeak(), 500);
  }

  setTimeout(() => {
    attackProgBar.style.width = 0 + "%";
    image.src = onAttack.initImg;
  }, 400);

  playersLife(defender, attack, totalLife);
};

//  === LIFE
function playersLife(defender, attack, totalLife) {
  const currentHitBar = defender.querySelector(".hit");
  const lifeProgBar = defender.querySelector(".lifeProgBar");

  currentHitBar.innerHTML = `<span class="showHit">-${attack}</span>`;

  // 1. Search Array if object exist
  let inDefence = charactersList.find((obj) => obj.type === defender.id);
  // 2. assign value into hit
  inDefence.damage.push(attack / 5);
  // 3. use reducer
  let total = inDefence.damage.reduce(reducer).toFixed(1);
  // update width of LIFE BAR
  lifeProgBar.style.width = 100 - total + "%";
  // update NUMBER score
  let rest = (inDefence.life = (100 - total).toFixed(1));

  totalLife.innerHTML = inDefence.life;

  const winner = charactersList.find((obj) => obj.life > 0);
  if (rest < 0) {
    lifeProgBar.style.width = 0 + "%";
    totalLife.innerHTML = 0;
    showModal(winner.type, winner.winImg);
  }
}

// === PLAYER EXCHANGE

// TODO: refactor player exchange ?

function playerExchange() {
  // get current player by attribute
  let attacker = btnPlay.getAttribute("attacker");
  // console.log(attacker);
  let currentPlayer = "";
  let defender = "";
  let totalLife = "";
  if (attacker === "dragon") {
    // set who will play next
    btnPlay.setAttribute("attacker", "knight");
    btnPlay.innerHTML = "Knight's Attack";

    currentPlayer = document.getElementById("dragon");
    defender = document.getElementById("knight");
    totalLife = document.querySelector(".knightLife");
  }

  if (attacker === "knight") {
    btnPlay.setAttribute("attacker", "dragon");
    btnPlay.innerHTML = "Dragon's Attack";
    currentPlayer = document.getElementById("knight");
    defender = document.getElementById("dragon");
    totalLife = document.querySelector(".dragonLife");
  }
  playersAttack(currentPlayer, defender, totalLife);
}

// ============== Princess ==============
//

function princessSpeak() {
  audio.src =
    princessPlaylist[Math.floor(Math.random() * princessPlaylist.length)];
  audio.play();
}

//
// ============== MODAL ==============
//
function showModal(winner, winnerImg) {
  const showModal = modalWindow.classList.add("show-modal");
  modalContainer.innerHTML = `
  <div class="modal-header"><h2>${winner} win </h2></div> 
  <div class="modal-body">
  <img src="${winnerImg}">
  </div> 
  <audio autoplay>
  <source src="assets/sound/clap_public.mp3">
  </audio>
  <div class="modal-footer">
  <button class="btn-close-modal" onclick="closeModal()" type="submit">close</button>
  </div> 
  `;
}

function closeModal() {
  window.location.reload();
}

//
// ============== LISTENERS ==============
//

btnPlay.addEventListener("click", playerExchange);
