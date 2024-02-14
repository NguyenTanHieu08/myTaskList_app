// define UI Vars
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-task");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

//load all eventlisteners

loadEventListeners();

//load all event listeners

function loadEventListeners() {
  //add task
  form.addEventListener("submit", addTask);
  // remove task event
  taskList.addEventListener("click", removeTask);
  //clear task event
  clearBtn.addEventListener("click", clearTask);
  //filter
  filter.addEventListener("keyup", filterTask);
}

// START
//GET tasks from list
function getTasks() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function (task) {
    // create li element
    const li = document.createElement("li");
    // add class
    li.className = "collection-item";
    //create texxt node and append
    li.appendChild(document.createTextNode(task));
    // create a new link

    const link = document.createElement("a");
    // add class into link

    link.className = "delete-item sencondary-content";

    //next, add icon for this
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // append link to li
    li.appendChild(link);
  });
}
//add task
function addTask(e) {
  if (taskInput.value === "") {
    alert("Add a Task");
  }
  // create li element
  const li = document.createElement("li");
  // add class
  li.className = "collection-item";
  //create texxt node and append
  li.appendChild(document.createTextNode(taskInput.value));
  // create a new link

  const link = document.createElement("a");
  // add class into link

  link.className = "delete-item sencondary-content";

  //next, add icon for this
  link.innerHTML = '<i class="fa fa-remove"></i>';
  // append link to li
  li.appendChild(link);
  // appen li to ul
  taskList.appendChild(li);

  taskInput.value = "";
  //   console.log(li);

  e.preventDefault(); // prevent a event forward to new page
}
// END ADD TASK

//  STRAT remove task
function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    // console.log(e.target);
    if (confirm("Are you sure?")) {
      e.target.parentElement.parentElement.remove();
    }
  }
}
//clear Tasks

function clearTask(e) {
  //   taskList.innerHTML = "";
  // the way faster :
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
}

//filter TAsk
function filterTask(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll(".collection-item").forEach(function (task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}
