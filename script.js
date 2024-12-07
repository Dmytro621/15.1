const formAddButton = document.querySelector('.form__btn')
const todoList = document.querySelector('.js--todos-wrapper') 
const todoListContent = document.querySelector('.js--form__input')
const listDeleteButton = document.querySelectorAll('.todo-item__delete') 
const todo = document.querySelector('.todo-item')



function deleteItem() {
    const listDeleteButton = document.querySelectorAll('.todo-item__delete') 

    listDeleteButton.forEach(button => {
        button.addEventListener('click', function () {
        
        const deleteItem = this.parentElement;
        
            deleteItem.remove()
            saveList()
    })
})
}
deleteItem()
checkboxChange()

formAddButton.addEventListener('click', () => {
    if (todoListContent.value.trim() !== '') {
        const addTodoList = `
        <li class = "todo-item">
            <input type="checkbox" class = "checkbox">
                <span class="todo-item__description">${todoListContent.value}</span>
                <button class="todo-item__delete">Видалити</button>
        </li>`;
        todoList.innerHTML += addTodoList

        todoListContent.value = '' 
    } 
    
    deleteItem()
    checkboxChange()
    saveList()
})

function checkboxChange() {
    const checkboxes = document.querySelectorAll('.checkbox');

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            const todoItem = checkbox.parentElement;
            if (checkbox.checked) {
                todoItem.classList.add('todo-item--checked');
            } else {
                todoItem.classList.remove('todo-item--checked');
            }
            saveList()
        });
    });
}


function saveList() {
    const todoItems = [];
    const listItems = document.querySelectorAll('.todo-item');

    listItems.forEach(item => {
        const description = item.querySelector('.todo-item__description').textContent;
        const isChecked = item.querySelector('.checkbox').checked;
        todoItems.push({ description, isChecked });
    });

    localStorage.setItem('savedList', JSON.stringify(todoItems));
}

function restoreList() {
    const savedList = localStorage.getItem('savedList');
    if (savedList) {
        const todoItems = JSON.parse(savedList);

        todoList.innerHTML = ''; 

        todoItems.forEach(todo => {
            const addTodoList = `
            <li class="todo-item">
                <input type="checkbox" class="checkbox" ${todo.isChecked ? 'checked' : ''}>
                <span class="todo-item__description">${todo.description}</span>
                <button class="todo-item__delete">Видалити</button>
            </li>`;

            todoList.innerHTML += addTodoList;
        });


        deleteItem();
        checkboxChange();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    restoreList(); 
});