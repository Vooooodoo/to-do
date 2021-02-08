// найдём шаблон to-do-item-template
const toDoItemTemplate = document.querySelector('#to-do-item-template').content;
// создадим пустого клона элемента to-do-item внутри шаблона 
const toDoItem = toDoItemTemplate.querySelector('.to-do-item').cloneNode(true); 
const 
