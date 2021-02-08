const addButton = document.querySelector('.form__button');
const input = document.querySelector('.form__input');
const toDoList = document.querySelector('.to-do__list');

function addToDoItem() {
  // найдём шаблон to-do-item-template
  const toDoItemTemplate = document.querySelector('#to-do-item-template').content;
  // создадим пустого клона элемента to-do-item внутри шаблона
  const toDoItem = toDoItemTemplate.querySelector('.to-do-item').cloneNode(true);
  const toDoText = toDoItem.querySelector('.to-do-item__text');      
  
  if (input.value) {
    toDoText.textContent = input.value;
    
    toDoList.append(toDoItem);
    
    input.value = '';    
  }
}

function deleteToDoItem(evt) {
  if (evt.target.classList.contains('to-do-item__button_type_delete')) {
    evt.target.parentNode.remove();
  }
}

function completeToDoItem(evt) {
  if (evt.target.classList.contains('to-do-item__button_type_complete')) {        
    evt.target.previousElementSibling.classList.add('to-do-item__text_type_complete');
  }
}

addButton.addEventListener('click', addToDoItem);
document.addEventListener('click', deleteToDoItem);
document.addEventListener('click', completeToDoItem);
