const dataResponse = [
    {
        title: 'Городской маркет',
        description: 'Локальные бренды, мастерские и уличная еда на одной площадке.',
        link: 'event1.html',
        category: [
            {
                category1: 'Категория 1'
            },
            {
                category2: 'Категория 2'
            }
        ]
    },
    {
        title: 'Вечер джаза',
        description: 'Живой концерт с классикой джаза и авторскими композициями.',
        link: 'event2.html',
        category: [
            {
                category2: 'Категория 2'
            }
        ]
    }
]

const cards = document.querySelectorAll('.card');
const filterButtons = document.querySelectorAll('.filters .button');
const selectedCategories = new Set();

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

        cards.forEach((card) => {
            const categoryCard = card.dataset.filter;

            let isActive = false;
            if (selectedCategories.has(categoryCard) || selectedCategories.size == 0) {
                isActive = true;
            }

            isActive ? card.classList.remove('hidden') : card.classList.add('hidden');
        })
    })
})