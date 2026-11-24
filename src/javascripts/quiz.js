const quiz = [
    {
        text: 'Чувствуете ли вы такой же вайбик как у нее?',
        answers: [
            {
                text: 'Да',
                points: 0
            },
            {
                text: 'Нет',
                points: 1
            },
            {
                text: 'Конечно',
                points: 2
            }
        ]
    },
    {
        text: 'Вопрос № 2',
        answers: [
            {
                text: 'Ответ № 1',
                points: 0
            },
            {
                text: 'Ответ № 2',
                points: 1
            },
            {
                text: 'Ответ № 3',
                points: 2
            }
        ]
    },
    {
        text: 'Вопрос № 3',
        answers: [
            {
                text: 'Ответ № 1',
                points: 0
            },
            {
                text: 'Ответ № 2',
                points: 1
            },
            {
                text: 'Ответ № 3',
                points: 2
            }
        ]
    }
]

const quizDescription = [
    {
        from: 0,
        to: 3,
        text: 'Вы не Маргарита'
    },
    {
        from: 4,
        to: 6,
        text: 'Вы точно Маргарита'
    }
]

const progress = document.querySelector('.quiz-progress');
const question = document.querySelector('.quiz-question');
const answers = document.querySelector('.quiz-answers');
const back = document.querySelector('.quiz-back');
const container = document.querySelector('.quiz-container');
const result = document.querySelector('.quiz-result');
const resultDescription = document.querySelector('.quiz-result-description');
const resultTitle = document.querySelector('.quiz-result-title');

let questionIdex = 0;

const selectAnswers = []

function createQuestion() {
    answers.replaceChildren();

    question.textContent = quiz[questionIdex].text;
    progress.textContent = `Вопрос ${(questionIdex + 1)} из ${quiz.length}`

    quiz[questionIdex].answers.forEach((answer) => {
        const button = document.createElement('button')
        button.type = 'button';
        button.textContent = answer.text;
        button.classList.add('quiz-answer');
        //button.dataset.points = answer.points;

        answers.append(button);

        button.addEventListener('click', () => {
            selectAnswers[questionIdex] = answer.points;
            
            if (quiz.length <= (questionIdex + 1)) {
                //Вывод итогов
                container.classList.add('hidden');
                result.classList.remove('hidden');

                let maxTotal = 0;
                let total = 0;
                selectAnswers.forEach((point, i) => {
                    total += point;
                    //total = total + point;
                    let maxTotalStep = 0;
                    quiz[i].answers.forEach((answerPoints) => {
                        if(answerPoints.points > maxTotalStep) {
                            maxTotalStep = answerPoints.points;
                        }
                    })

                    maxTotal += maxTotalStep
                })

                resultTitle.textContent = `Результат: ${total} из ${maxTotal}`

                quizDescription.forEach((descriptionItem) => {
                    if(
                        total >= descriptionItem.from &&
                        total <= descriptionItem.to
                    ) {
                        resultDescription.textContent = descriptionItem.text
                    }
                })                
            }
            else {
                questionIdex++;
                createQuestion();
            }
        })
    })

    questionIdex == 0 ? back.classList.add('hidden') : back.classList.remove('hidden')
}

createQuestion();

back.addEventListener('click', () => {
    questionIdex--;
    createQuestion();
});