const addBtn = document.querySelector('.form__button');
const input = document.querySelector('.form__input');
const toDoList = document.querySelector('.to-do__list');
const toDoItemsArr = localStorage.getItem('to-do-items') ? JSON.parse(localStorage.getItem('to-do-items')) : [];

function createId() {
  return Date.now();
}

function addToDoItem(value, id) {  
  const toDoItemTemplate = document.querySelector('#to-do-item-template').content;  
  const toDoItem = toDoItemTemplate.querySelector('.to-do-item').cloneNode(true);
  const toDoText = toDoItem.querySelector('.to-do-item__text');
  
  toDoItem.id = id;
  toDoText.textContent = value;    
  toDoList.prepend(toDoItem);    
}

function addDataToLocalStorage(id) {
  toDoItemsArr.push({ value: input.value, id });
  localStorage.setItem('to-do-items', JSON.stringify(toDoItemsArr));
}

function clearInput() {
  input.value = '';
}

function createToDoItem() {
  const id = createId();

  addToDoItem(input.value, id);
  addDataToLocalStorage(id);
  clearInput();
}

function handleEnter(evt) {  
  if (evt.key === 'Enter' && input.value) {
    createToDoItem();
  }  
}

function handleAddBtn() {  
  if (input.value) {
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
    localStorage.setItem('to-do-items', JSON.stringify(toDoItemsArr));
  }
}

function completeToDoItem(evt) {
  const toDoItem = evt.target.parentNode;

  if (evt.target.classList.contains('to-do-item__button_type_complete')) {        
    evt.target.previousElementSibling.classList.toggle('to-do-item__text_type_complete');
  }

  toDoItemsArr.forEach(item => {
    if (Number(toDoItem.id) === item.id) {
      item.complete = true;                
    }
  });

  console.log(toDoItemsArr);
}

function renderToDoItems() {
  toDoItemsArr.forEach(item => {
    addToDoItem(item.value, item.id);
  });
}

addBtn.addEventListener('click', handleAddBtn);
document.addEventListener('click', deleteToDoItem);
document.addEventListener('click', completeToDoItem);
document.addEventListener('keydown', handleEnter);
document.addEventListener('load', renderToDoItems());
document.addEventListener('submit', evt => evt.preventDefault());
