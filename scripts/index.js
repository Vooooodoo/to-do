const toDoForm = document.forms.toDoForm;
const toDoInput = document.querySelector('.form__input');
const addBtn = document.querySelector('.form__button');
const toDoList = document.querySelector('.to-do__list');
let toDoItemsArr = localStorage.getItem('to-do-items') ? JSON.parse(localStorage.getItem('to-do-items')) : [];

const addToDoItem = (value, id, complete) => {  
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

const addDataToLocalStorage = () => {
  localStorage.setItem('to-do-items', JSON.stringify(toDoItemsArr));
}

const saveData = (id) => {
  toDoItemsArr.push({ value: toDoInput.value.trim(), id });
  addDataToLocalStorage();
}

const clearInput = () => {
  toDoInput.value = '';
}

const createToDoItem = () => {
  const id = Date.now();

  addToDoItem(toDoInput.value.trim(), id);
  saveData(id);
  clearInput();
}

const handleAddBtn = () => {  
  if (toDoInput.value.trim()) {
    createToDoItem();
  }   
}

const handleEnter = (evt) => {  
  if (evt.key === 'Enter' && toDoInput.value.trim()) {
    createToDoItem();
  }  
}

const deleteToDoItem = (evt) => {
  const toDoItem = evt.target.parentNode;

  toDoItemsArr = toDoItemsArr.filter(item => Number(toDoItem.id) !== item.id);
  
  toDoItem.remove();
  addDataToLocalStorage();
}

const handleDeleteBtn = (evt) => {
  if (evt.target.classList.contains('to-do-item__button_type_delete')) {
    deleteToDoItem(evt);
  }
}

const changeToDoItemsArr = (key, value, elementId) => {
  toDoItemsArr = toDoItemsArr.map(item => {
    if (Number(elementId) === item.id) {
      item[key] = value;
    }

    return item;
  });
}

const setComplete = (element, value) => {  
  changeToDoItemsArr('complete', value, element.id)
}

const completeToDoItem = (evt) => {  
  if (evt.target.classList.contains('to-do-item__button_type_complete')) {    
    const toDoItem = evt.target.parentNode;
    const toDoText = evt.target.previousElementSibling;

    toDoText.classList.toggle('to-do-item__text_type_complete');

    setComplete(toDoItem, toDoText.classList.contains('to-do-item__text_type_complete'));
    
    addDataToLocalStorage();
  }  
}

const editToDoItem = (evt) => {
  if (evt.target.classList.contains('to-do-item__text')) {
    const toDoItemText = evt.target.textContent.trim();
    const toDoItemId = evt.target.parentNode.id;

    if (toDoItemText) {            
      changeToDoItemsArr('value', toDoItemText.slice(0, 5), toDoItemId)
      addDataToLocalStorage();
      evt.target.setAttribute('contenteditable', 'true');
    } else {
      deleteToDoItem(evt);
    }        
  }
}

const checkTextLength = (evt) => {
  if (evt.target.classList.contains('to-do-item__text')) {
    if (evt.target.textContent.length > 5) {      
      evt.target.setAttribute('contenteditable', 'false');
      evt.target.textContent = evt.target.textContent.slice(0, 5);
      alert('Ограничение в 5 символов. Пожалуйста сократите текст.');
    }
  }
}

const renderToDoItems = () => {
  toDoItemsArr.forEach(item => {
    addToDoItem(item.value, item.id, item.complete);
  });
}

addBtn.addEventListener('click', handleAddBtn);
document.addEventListener('click', handleDeleteBtn);
document.addEventListener('click', completeToDoItem);
document.addEventListener('keydown', handleEnter);
document.addEventListener('keydown', checkTextLength);
document.addEventListener('load', renderToDoItems());
document.addEventListener('focusout', editToDoItem);
toDoForm.addEventListener('submit', evt => evt.preventDefault());
