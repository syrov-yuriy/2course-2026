const button = document.querySelector('.roll-button');

const diceValue = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];
const score = [0, 0];

function playGame() {
    console.log('Понеслось!');
    let min = 0;
    let playerValue = Math.floor(Math.random() * diceValue.length);
    let computerValue = Math.floor(Math.random() * (diceValue.length - min + 1)) + min;
}

button.addEventListener('click', playGame)