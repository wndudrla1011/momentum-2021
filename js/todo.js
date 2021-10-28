const toDoFormExp = document.getElementById("todo-form");
const toDoExpired = toDoFormExp.querySelector(".expired");
const toDoItems = toDoFormExp.querySelector(".items");
const toDoSave = toDoFormExp.querySelector(".save");
const toDoList = document.getElementById("todo-list");
const resultExp = document.querySelector(".result-exp");
const today = new Date();
const todayMonth = today.getMonth() + 1;
const todayDate = today.getDate();
let count = 0;

const TODOS_KEY = "toDos";

let toDos = [];

function saveToDos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function deleteToDo(event) {
  const li = event.target.parentElement;
  li.remove();
  toDos = toDos.filter((toDo) => toDo.id != parseInt(li.id));
  saveToDos();
}

function paintToDo(newTodo) {
  const li = document.createElement("li");
  li.id = newTodo.id;
  const span = document.createElement("span");
  span.innerText = newTodo.text;
  const item = document.createElement("span");
  item.innerText = newTodo.item;
  const button = document.createElement("button");
  button.innerText = "X";
  button.style.color = "red";
  button.addEventListener("click", deleteToDo);
  li.appendChild(span);
  li.appendChild(item);
  li.appendChild(button);
  toDoList.appendChild(li);
}

function handleToDoSubmit(event) {
  event.preventDefault();
  const newTodo = toDoExpired.value;
  const newItems = toDoItems.value;
  toDoExpired.value = "";
  toDoItems.value = "";
  const newTodoObj = {
    item: newItems,
    text: newTodo,
    id: Date.now(),
  };
  toDos.push(newTodoObj);
  paintToDo(newTodoObj);
  saveToDos();
}

toDoFormExp.addEventListener("submit", handleToDoSubmit);
window.addEventListener("load", alertFunction);

const savedToDos = localStorage.getItem(TODOS_KEY);

if (savedToDos !== null) {
  const parsedToDos = JSON.parse(savedToDos);
  toDos = parsedToDos;
  parsedToDos.forEach(paintToDo);
  parsedToDos.forEach(checkClock);
}

function checkClock(newTodo) {
  const content = newTodo.text;
  let month = content.slice(2, 4); //입력 받은 month
  let date = content.slice(4, 6); //입력 받은 date
  if (todayMonth == month) {
    if (date < todayDate) {
      count = count + 1;
    }
  } else if (todayMonth > month) {
    count = count + 1;
  } else if (parseInt(month) - parseInt(todayMonth) == 1) {
    console.log("!");
    let d_day;
    if (date <= todayDate) {
      date = parseInt(date) + 30;
      d_day = date - todayDate;
      changeColorExp(d_day, newTodo);
    } else {
      d_day = parseInt(date) - todayDate;
      changeColorExp(d_day, newTodo);
    }
  }
}

function changeColorExp(d_day, newTodo) {
  const span = document.createElement("span");
  if (d_day > 20 && d_day <= 30) {
    span.innerText = `${newTodo.item} 품목은 ${d_day}일 남았어요!`;
    span.style.color = "green";
  } else if (d_day > 10 && d_day <= 20) {
    span.innerText = `${newTodo.item} 품목은 ${d_day}일 남았어요!`;
    span.style.color = "yellow";
  } else if (d_day > 5 && d_day <= 10) {
    span.innerText = `${newTodo.item} 품목은 ${d_day}일 남았어요!`;
    span.style.color = "orange";
  } else {
    span.innerText = `${newTodo.item} 품목은 ${d_day}일 남았어요!`;
    span.style.color = "red";
  }
  resultExp.appendChild(span);
}

function alertFunction() {
  console.log(`${count}개 품목이 만료되었어요!`);
}
