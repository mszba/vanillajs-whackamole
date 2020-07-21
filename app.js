const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
const startButton = document.querySelector('.start');
let lastHole;
let timeUp = false;
let score = 0;

startButton.addEventListener('click', startGame);

function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
  const index = Math.floor(Math.random() * holes.length);
  const hole = holes[index];

  if (hole === lastHole) {
    return randomHole(holes);
  }

  lastHole = hole;
  return hole;
}

function pop() {
  const time = randomTime(200, 1000);
  const hole = randomHole(holes);
  hole.classList.add('up');
  setTimeout(() => {
    hole.classList.remove('up');
    if (!timeUp) pop();
  }, time);
}

function startGame() {
  scoreBoard.innerText = 0;
  timeUp = false;
  pop();
  score = 0;
  setTimeout(() => timeUp = true, 10000)
}

function tapMole(e) {
  const mole = e.target
  if (!e.isTrusted) return
  score++;
  mole.parentNode.classList.remove('up');
  scoreBoard.innerText = score;
}

moles.forEach((mole) => {
  mole.addEventListener('click', tapMole)
})
