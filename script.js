// ████████ VARIABLES
const btn = document.querySelector("#submitBtn");
const list = document.querySelector("ul");
const input = document.querySelector("input");
const todoList = [];
const completedTaskText = document.querySelector("#completedTasks");

// ████████ EVENT LISTENERS
btn.addEventListener("click", addItem);
input.addEventListener("input", adjustInputWidth);
list.addEventListener("click", completeItem);

// ████████ FUNCTIONS
// Add new item to list when clicking the pencil
function addItem() {
  const newPoint = document.createElement("li");
  newPoint.innerText = input.value;
  list.appendChild(newPoint);
  todoList.push({ Item: input.value, Completed: "no" }); // Add item as object to array
  input.value = "";
  adjustInputWidth(); // Makes sure to reset input field width after submitting
  updateCompletedTasks(); // Update DOM
}

// Dynamically adjust the width of input field so that the pencil moves with it
function adjustInputWidth() {
  const value = input.value;
  const width = value.length * 8 + 8;
  if (width == 8) input.style.width = "200px";
  else if (width > 400) input.style.width = "400px";
  else input.style.width = width + "px"; // Changes input field width dynamically in relation to number of characters. Also resets width at 0 characters and sets a maximum width of 400 px when field becomes long enough.
}

// Function to mark or unmark the todo item with a line strikethrough and toggle "Completed" property in object
function completeItem(e) {
  const item = e.target;
  if (item.style.textDecoration !== "line-through") {
    item.style.textDecoration = "line-through";
    todoList.forEach(checkArray); // Call function to change status in array to "yes"
  } else {
    item.style.textDecoration = "none";
    todoList.forEach(uncheckArray); // Call function to change status in array to "no"
  }
  // Function to change status in array to "yes
  function checkArray(item, index, array) {
    if (array[index].Item == e.target.innerText) array[index].Completed = "yes";
  }
  // Function to change status in array to "no"
  function uncheckArray(item, index, array) {
    if (array[index].Item == e.target.innerText) array[index].Completed = "no";
  }
  // Update DOM text of completed tasks
  updateCompletedTasks();
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

/* ███████████████ TODO ███████████████ 
- Add option to delete




*/
