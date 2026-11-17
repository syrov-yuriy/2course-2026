const dataResponse = [
    {
        sort: 1,
        title: 'Городской маркет',
        description: 'Локальные бренды, мастерские и уличная еда на одной площадке.',
        link: 'event1.html',
        category: [
            {
                id: 'category1',
                title: 'Категория 1'
            },
            {
                id: 'category2',
                title: 'Категория 2'
            }
        ]
    },
    {
        sort: 2,
        title: 'Вечер джаза',
        description: 'Живой концерт с классикой джаза и авторскими композициями.',
        link: 'event2.html',
        category: [
            {
                id: 'category2',
                title: 'Категория 2'
            }
        ]
    },
    {
        sort: 3,
        title: 'Выставка плакатов',
        description: 'Работы молодых дизайнеров и экскурсия по выставке.',
        link: 'event3.html',
        category: [
            {
                id: 'category3',
                title: 'Категория 3'
            }
        ]
    },
    {
        sort: 4,
        title: 'Открытая мастерская',
        description: 'Практическое занятие, где можно сделать вещь своими руками.',
        link: 'event1.html',
        category: [
            {
                id: 'category1',
                title: 'Категория 1'
            }
        ]
    },
    {
        sort: 5,
        title: 'Кино под открытым небом',
        description: 'Вечерний показ фильма во дворе культурного центра.',
        link: 'event2.html',
        category: [
            {
                id: 'category2',
                title: 'Категория 2'
            }
        ]
    },
    {
        sort: 6,
        title: 'Прогулка с гидом',
        description: 'Маршрут по городу с историями о знакомых местах.',
        link: 'event3.html',
        category: [
            {
                id: 'category3',
                title: 'Категория 3'
            }
        ]
    },
    {
        sort: 7,
        title: 'Городской маркет',
        description: 'Локальные бренды, мастерские и уличная еда на одной площадке.',
        link: 'event1.html',
        category: [
            {
                id: 'category1',
                title: 'Категория 1'
            },
            {
                id: 'category2',
                title: 'Категория 2'
            }
        ]
    },
    {
        sort: 7,
        title: 'Вечер джаза',
        description: 'Живой концерт с классикой джаза и авторскими композициями.',
        link: 'event2.html',
        category: [
            {
                id: 'category2',
                title: 'Категория 2'
            }
        ]
    },
    {
        sort: 8,
        title: 'Выставка плакатов',
        description: 'Работы молодых дизайнеров и экскурсия по выставке.',
        link: 'event3.html',
        category: [
            {
                id: 'category3',
                title: 'Категория 3'
            }
        ]
    },
    {
        sort: 9,
        title: 'Открытая мастерская',
        description: 'Практическое занятие, где можно сделать вещь своими руками.',
        link: 'event1.html',
        category: [
            {
                id: 'category1',
                title: 'Категория 1'
            }
        ]
    },
    {
        sort: 10,
        title: 'Кино под открытым небом',
        description: 'Вечерний показ фильма во дворе культурного центра.',
        link: 'event2.html',
        category: [
            {
                id: 'category2',
                title: 'Категория 2'
            }
        ]
    },
    {
        sort: 11,
        title: 'Прогулка с гидом',
        description: 'Маршрут по городу с историями о знакомых местах.',
        link: 'event3.html',
        category: [
            {
                id: 'category3',
                title: 'Категория 3'
            }
        ]
    }
]

const cardsContainer = document.querySelector('.cards');
const cardTemplate = document.querySelector('#event-card');
const filterButtons = document.querySelectorAll('.filters .button');
const sortSelect = document.querySelector('.sort-select');
const selectedCategories = new Set();

function renderCard(event) {
    const card = cardTemplate.content.cloneNode(true);

    //Наполнение карточки
    card.querySelector('h2').textContent = event.title;
    card.querySelector('p').textContent = event.description;
    //<span class="category"></span>
    event.category.forEach((category) => {
        const categoryTag = document.createElement('span')
        categoryTag.classList.add('category')
        categoryTag.textContent = category.title

        card.querySelector('.card-cotegories').append(categoryTag)
    })

    card.querySelector('.button').href = './events/' + event.link

    //Публикуем карточку
    cardsContainer.append(card)
}

dataResponse.forEach((event) => {
    renderCard(event)  
});

filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const category = button.dataset.category;
        
        if (category === 'all') {
            //Очистить выбранные категории
            selectedCategories.clear();
        }
        else if (selectedCategories.has(category)) {
            //Удаляем выбранную категорию
            selectedCategories.delete(category);
        }
        else {
            //Добавляем выбранную категорию
            selectedCategories.add(category);
        }

        filterButtons.forEach((buttonValidate) => {
            const categoryValidate = buttonValidate.dataset.category;
            if (categoryValidate === 'all') {
                selectedCategories.size == 0 
                ? buttonValidate.classList.add('active') 
                : buttonValidate.classList.remove('active');
            }
            else {
                selectedCategories.has(categoryValidate) 
                ? buttonValidate.classList.add('active') 
                : buttonValidate.classList.remove('active');
            }
        });

        updateCards ();
    })
})

sortSelect.addEventListener('change', () => {
    if (sortSelect.value === 'title-asc') {
        dataResponse.sort((a, b) => {
            return a.title.localeCompare(b.title, 'ru')
        })
    }
    else if (sortSelect.value === 'title-desc') {
        dataResponse.sort((a, b) => {
            return b.title.localeCompare(a.title, 'ru')
        })
    }
    else {
        dataResponse.sort((a, b) => {
            return a.sort - b.sort
        })
    }

    updateCards ();
})

function updateCards () {
    cardsContainer.replaceChildren()
    dataResponse.forEach((event) => {
        let isActive = false;
        event.category.forEach((category) => {
            if (selectedCategories.has(category.id) || selectedCategories.size == 0) {
                isActive = true;
            }
        })

        if (isActive) renderCard(event)
    })
}