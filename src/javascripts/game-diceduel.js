const button = document.querySelector('.roll-button');
const history = document.querySelector('.history');
const dicesBlocks = document.querySelectorAll('.dice');
const diceValue = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];
const score = [0, 0];
const curentDices = [0, 0];
const randomDices = [0, 0];

function playGame() {
    dicesBlocks.forEach((diceElement, index) => {
        diceElement.classList.add('dice-roll');
    })

    const intervalId = setInterval(() => {
        randomDices[0] = Math.floor(Math.random() * diceValue.length);
        randomDices[1] = Math.floor(Math.random() * diceValue.length);
        dicesBlocks.forEach((diceElement, index) => {
            diceElement.innerText = diceValue[randomDices[index]];
        })
    }, 60);

    setTimeout(() => {
        clearInterval(intervalId); // Останавливаем интервал

        let min = 0;
        let classHistory = '';
        curentDices[0] = Math.floor(Math.random() * diceValue.length);
        curentDices[1] = Math.floor(Math.random() * ((diceValue.length - 1) - min + 1)) + min;

        dicesBlocks.forEach((diceElement, index) => {
            diceElement.classList.remove('dice-roll');
            diceElement.innerText = diceValue[curentDices[index]];
        })

        //Кто выиграл?
        if (curentDices[0] > curentDices[1]) {
            score[0]++;
            classHistory = 'history-green';
        }
        else if(curentDices[0] < curentDices[1]) {
            score[1]++;
            classHistory = 'history-red';
        }
        else {
            //Ниче не делаем
            //score[0]++;
            //score[1]++;
            classHistory = 'history-grey';
        }

        const scoreBlocks = document.querySelectorAll('.score');
        scoreBlocks.forEach((scoreElement, index) => {
            scoreElement.innerText = score[index];
        })

        const historyItem = document.createElement('div');
        historyItem.classList.add('history-item');
        historyItem.classList.add(classHistory);
        historyItem.innerText = (curentDices[0] + 1) + ' — ' + (curentDices[1] + 1);
        history.prepend(historyItem);

        const historyBlocks = document.querySelectorAll('.history-item');
        historyBlocks.forEach((historyElement, index) => {
            if (index >= 3) {
                historyElement.remove();
            }
        })
    }, 2000);    
}

button.addEventListener('click', playGame)
