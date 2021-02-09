const input = document.querySelector('.form__input');
const addBtn = document.querySelector('.form__button');
const toDoList = document.querySelector('.to-do__list');
const toDoItemsArr = localStorage.getItem('to-do-items') ? JSON.parse(localStorage.getItem('to-do-items')) : [];

function createId() {
  return Date.now();
}

function addToDoItem(value, id, complete) {  
  const toDoItemTemplate = document.querySelector('#to-do-item-template').content;  
  const toDoItem = toDoItemTemplate.querySelector('.to-do-item').cloneNode(true);
  const toDoText = toDoItem.querySelector('.to-do-item__text');
  
  toDoItem.id = id;
  toDoText.textContent = value;    
  toDoList.prepend(toDoItem);
  
  if (complete) {
    toDoText.classList.add('to-do-item__text_type_complete');
  }
}

function addDataToLocalStorage() {
  localStorage.setItem('to-do-items', JSON.stringify(toDoItemsArr));
}

function saveData(id) {
  toDoItemsArr.push({ value: input.value, id });
  addDataToLocalStorage();
}

function clearInput() {
  input.value = '';
}

function createToDoItem() {
  const id = createId();

  addToDoItem(input.value, id);
  saveData(id);
  clearInput();
}

function handleAddBtn() {  
  if (input.value) {
    createToDoItem();
  }   
}

function handleEnter(evt) {  
  if (evt.key === 'Enter' && input.value) {
    createToDoItem();
  }  
}

function deleteToDoItem(evt) {
  if (evt.target.classList.contains('to-do-item__button_type_delete')) {
    const toDoItem = evt.target.parentNode;

    toDoItemsArr.forEach((item, index, arr) => {
      if (Number(toDoItem.id) === item.id) {
        arr.splice(index, 1);                
      }
    });
    
    toDoItem.remove();
    addDataToLocalStorage();
  }
}

function setComplete(element, value) {
  toDoItemsArr.forEach(item => {
    if (Number(element.id) === item.id) {
      item.complete = value;
    }
  });
}

function completeToDoItem(evt) {
  const toDoItem = evt.target.parentNode;
  const toDoText = evt.target.previousElementSibling;

  if (evt.target.classList.contains('to-do-item__button_type_complete')) {        
    toDoText.classList.toggle('to-do-item__text_type_complete');
  }

  toDoText.classList.contains('to-do-item__text_type_complete')
    ? setComplete(toDoItem, true)
    : setComplete(toDoItem, false);

  addDataToLocalStorage();
}

function renderToDoItems() {
  toDoItemsArr.forEach(item => {
    addToDoItem(item.value, item.id, item.complete);
  });
}

addBtn.addEventListener('click', handleAddBtn);
document.addEventListener('click', deleteToDoItem);
document.addEventListener('click', completeToDoItem);
document.addEventListener('keydown', handleEnter);
document.addEventListener('load', renderToDoItems());
document.addEventListener('submit', evt => evt.preventDefault());
