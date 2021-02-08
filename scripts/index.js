const addButton = document.querySelector('.form__button');
const input = document.querySelector('.form__input');
const toDoList = document.querySelector('.to-do__list');

function addToDoItem() {
  // найдём шаблон to-do-item-template
  const toDoItemTemplate = document.querySelector('#to-do-item-template').content;
  // создадим пустого клона элемента to-do-item внутри шаблона
  const toDoItem = toDoItemTemplate.querySelector('.to-do-item').cloneNode(true);
  const toDoText = toDoItem.querySelector('.to-do-item__text');      
    
  toDoText.textContent = input.value;
    
  toDoList.append(toDoItem);
    
  input.value = '';
}

addButton.addEventListener('click', addToDoItem);
