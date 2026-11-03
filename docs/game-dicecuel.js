/******/ (() => { // webpackBootstrap
var button = document.querySelector('.roll-button');
var history = document.querySelector('.history');
var dicesBlocks = document.querySelectorAll('.dice');
var diceValue = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];
var score = [0, 0];
var curentDices = [0, 0];
var randomDices = [0, 0];
function playGame() {
  dicesBlocks.forEach(function (diceElement, index) {
    diceElement.classList.add('dice-roll');
  });
  var intervalId = setInterval(function () {
    randomDices[0] = Math.floor(Math.random() * diceValue.length);
    randomDices[1] = Math.floor(Math.random() * diceValue.length);
    dicesBlocks.forEach(function (diceElement, index) {
      diceElement.innerText = diceValue[randomDices[index]];
    });
  }, 60);
  setTimeout(function () {
    clearInterval(intervalId); // Останавливаем интервал

    var min = 0;
    var classHistory = '';
    curentDices[0] = Math.floor(Math.random() * diceValue.length);
    curentDices[1] = Math.floor(Math.random() * (diceValue.length - 1 - min + 1)) + min;
    dicesBlocks.forEach(function (diceElement, index) {
      diceElement.classList.remove('dice-roll');
      diceElement.innerText = diceValue[curentDices[index]];
    });

    //Кто выиграл?
    if (curentDices[0] > curentDices[1]) {
      score[0]++;
      classHistory = 'history-green';
    } else if (curentDices[0] < curentDices[1]) {
      score[1]++;
      classHistory = 'history-red';
    } else {
      //Ниче не делаем
      //score[0]++;
      //score[1]++;
      classHistory = 'history-grey';
    }
    var scoreBlocks = document.querySelectorAll('.score');
    scoreBlocks.forEach(function (scoreElement, index) {
      scoreElement.innerText = score[index];
    });
    var historyItem = document.createElement('div');
    historyItem.classList.add('history-item');
    historyItem.classList.add(classHistory);
    historyItem.innerText = curentDices[0] + 1 + ' — ' + (curentDices[1] + 1);
    history.prepend(historyItem);
    var historyBlocks = document.querySelectorAll('.history-item');
    historyBlocks.forEach(function (historyElement, index) {
      if (index >= 3) {
        historyElement.remove();
      }
    });
  }, 2000);
}
button.addEventListener('click', playGame);
/******/ })()
;