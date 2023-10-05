// ████████ VARIABLES
const btn = document.querySelector("#submitBtn");
const list = document.querySelector("ul");
const input = document.querySelector("input");
const todoList = [];
const completedTaskText = document.querySelector("#completedTasks");
const eraser = document.querySelector("#eraser");
let eraserCursor = false;
const eraserCursorTrigger = document.querySelector("#eraserCursorTrigger");
const eraserHover = document.querySelector("#eraserHover");
const html = document.querySelector("h1");

// ████████ EVENT LISTENERS
btn.addEventListener("click", addItem);
input.addEventListener("input", adjustInputWidth);
input.addEventListener("click", dropEraser);
eraser.addEventListener("click", grabEraser);
list.addEventListener("click", completeItem);

// ████████ MAIN FUNCTIONS

// Add new item to list when clicking the pencil
function addItem() {
  if (input.value == "") {
    input.placeholder = "you have to write something first!";
    input.style.width = "220px";

  } else {
    const newPoint = document.createElement("li");
    newPoint.innerText = input.value;
    list.appendChild(newPoint);
    todoList.push({ Item: input.value, Completed: "no" }); // Add item as object to array
    input.value = "";
    input.placeholder = "wanna add something more?";
    adjustInputWidth(); // Makes sure to reset input field width after submitting
    updateCompletedTasks(); // Update DOM
  }
}

// Function to mark or unmark the todo item with a line strikethrough and toggle "Completed" property in object
function completeItem(e) {
  const item = e.target;
  if (item.style.textDecoration !== "line-through") {
    item.style.textDecoration = "line-through";
    for (i = 0; i < todoList.length; i++) {
      if (item.innerText == todoList[i].Item) todoList[i].Completed = "yes";
    }
  } else {
    item.style.textDecoration = "none";
    for (i = 0; i < todoList.length; i++) {
      if (item.innerText == todoList[i].Item) todoList[i].Completed = "no";
    }
  }
  updateCompletedTasks();
}

// Delete an item from the todo list
function deleteItem(e) {
  const item = e.target;
  if (item.nodeName == "LI") {
  for (i = 0; i < todoList.length; i++) {
    if (item.innerText == todoList[i].Item) todoList.splice(i, 1);
  }
  item.remove();
  updateCompletedTasks();}
}

// ███████████████ HELPER FUNCTIONS ███████████████

// Dynamically adjust the width of input field so that the pencil moves with it
function adjustInputWidth() {
  dropEraser();
  const value = input.value;
  const width = value.length * 8 + 8;
  if (width == 8) input.style.width = "200px";
  else if (width > 400) input.style.width = "400px";
  else input.style.width = width + "px"; // Changes input field width dynamically in relation to number of characters. Also resets width at 0 characters and sets a maximum width of 400 px when field becomes long enough.
}

// Function to grab the eraser
function grabEraser() {
  eraserCursorTrigger.innerHTML =
    "<style>*{cursor: url('img/eraser2small.png'), auto !important}</style>"; // Creating a style tag in DOM to add styling to the universal selector *, !important is to override pointer style of li elements
  ("background: linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)), url(img/eraser2.png) center/cover");
  eraser.style =
    "background: linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)), url(img/eraser2.png) center/cover; background-size: 40px 30px; height: 30px; width: 40px; cursor: url('img/eraser2small.png'), auto;";
  eraserHover.innerHTML = "";
  eraserCursor = true;
  updateListListener(); // Update status of event listener for list items
}

// Drop eraser which means changing cursor and adjusting styling for eraser element and updating event listener for list element
function dropEraser() {
  eraserCursorTrigger.innerHTML = "";
  eraser.style =
    "transform: translate(100px, 30px); background: url(img/eraser2.png) center/cover; background-size: 40px 30px; height: 30px; width: 40px; cursor: grab;";
  eraserHover.innerHTML =
    "<style>#eraser:hover {transform: rotate(12deg) scale(1.5) translate(70px, 0px); transition: all 0.6s ease-in-out;}</style>";
  eraserCursor = false;
  updateListListener();
}

// Function to update DOM text of completed tasks
function updateCompletedTasks() {
  let completedTasks = 0;
  const totalTasks = todoList.length;
  for (let i = 0; i < todoList.length; i++) {
    if (todoList[i].Completed == "yes") completedTasks++;
  }
  completedTaskText.innerHTML =
    "Number of tasks completed: " + completedTasks + "/" + totalTasks;
}

// Update event listener on list element depending on if erasor is enabled or not
function updateListListener() {
  if (eraserCursor == false) {
    eraser.removeEventListener("click", dropEraser);
    eraser.addEventListener("click", grabEraser);
    list.removeEventListener("click", deleteItem);
    list.addEventListener("click", completeItem);
  } else if (eraserCursor == true) {
    list.removeEventListener("click", completeItem);
    list.addEventListener("click", deleteItem);
    eraser.removeEventListener("click", grabEraser);
    eraser.addEventListener("click", dropEraser);
  }
}

/*  ███████████████ TODO ███████████████ 
 */
