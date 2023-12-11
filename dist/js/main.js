const initApp = () => {
  const tasks = document.getElementById("my-tasks");
  const btnSaveTask = document.getElementById("save-task");
  const myTask = document.getElementById("new-task");
  const profilePicture = document.getElementById("profile-picture");
  const userMenu = document.getElementById("user-menu");
  const btnLogOut = document.getElementById("log-out");
  let myTasks;

  function showTask(paramTask) {
    let taskObject;

    console.log(paramTask);

    if (paramTask) {
      taskObject = paramTask;
      console.log("param");
    } else {
      const myTask = document.getElementById("new-task");
      const task = myTask.value;

      console.log("hello");
      console.log(myTask);
      console.log(task);

      if (task) {
        taskObject = {
          id: Date.now(),
          title: task,
          finished: false,
        }

        // console.log(taskObject);
        myTasks.push(taskObject);
        saveTasksToLocalStorage(myTasks);
      }
    }

    console.log(taskObject);

    if (taskObject) {
      const newTask = document.createElement("div");
      newTask.classList.add("bg-wewak-500", "flex", "justify-between", "items-center", "rounded-lg", "p-6", "hover:drop-shadow-lg", "transition-all", "ease-in-out", "duration-150");

      const taskTitle = document.createElement("h3");
      taskTitle.classList.add("text-2xl", "text-wewak-50");
      taskTitle.innerText = taskObject.title;

      const taskActions = document.createElement("div");
      taskActions.classList.add("flex", "justify-between", "space-x-3");

      const deleteTask = document.createElement("img");
      deleteTask.classList.add("w-8", "cursor-pointer", "hover:opacity-50", "transition-opacity", "ease-in-out", "duration-200");
      deleteTask.src = "./img/trash3-fill.svg";
      deleteTask.alt = "Delete task";

      deleteTask.addEventListener("click", (e) => {
        const taskId = e.target.parentElement.nextElementSibling.value;
        const newTasks = myTasks.filter(task => task.id != taskId);
        // console.log(newTasks);
        saveTasksToLocalStorage(newTasks);
        e.target.parentElement.parentElement.remove();
      });

      const finishTask = document.createElement("img");
      finishTask.classList.add("w-8", "cursor-pointer", "hover:opacity-50", "transition-opacity", "ease-in-out", "duration-200");
      finishTask.src = "./img/circle.svg";
      finishTask.alt = "Finish Task";

      if (taskObject.finished) {
        newTask.classList.add("line-through");
        finishTask.src = "./img/check-circle.svg";
        newTask.classList.remove("bg-wewak-500");
        newTask.classList.add("bg-wewak-300");
      }

      const taskId = document.createElement("input");
      taskId.type = "hidden";
      taskId.value = taskObject.id;


      finishTask.addEventListener("click", (e) => {
        // Get the task id from the next html element.
        const taskId = e.target.parentElement.nextElementSibling.value;
        // console.log(taskId);

        // Find the task index on the array
        const taskIndex = myTasks.findIndex(task => task.id == taskId);

        if (taskIndex !== -1) {
          finished = myTasks[taskIndex].finished = !myTasks[taskIndex].finished;
          // console.log(myTasks[taskIndex].finished);
          saveTasksToLocalStorage(myTasks);
        }
        e.target.parentElement.parentElement.classList.toggle("line-through");
        e.target.parentElement.parentElement.classList.toggle("bg-wewak-500");
        e.target.parentElement.parentElement.classList.toggle("bg-wewak-300");

        if (!finished) {

          e.target.src = "./img/circle.svg";
        } else {
          e.target.src = "./img/check-circle.svg";
        }
      });

      // Bring all parts of the task together
      taskActions.append(deleteTask, finishTask);
      newTask.append(taskTitle, taskActions, taskId);

      tasks.appendChild(newTask);

      myTask.value = "";
    }

  }

  function toggleUserMenu() {
    userMenu.classList.toggle("scale-0");
    userMenu.classList.toggle("scale-100");
    userMenu.classList.toggle("opacity-0");
    userMenu.classList.toggle("opacity-100");
  }

  // Event Listeners
  btnSaveTask.addEventListener("click", () => showTask());
  myTask.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      showTask();
    }
  });

  profilePicture.addEventListener("click", () => {
    // userMenu.classList.toggle("hidden");
    // userMenu.classList.toggle("flex");
    toggleUserMenu();
  });

  // Close the menu if the user clicks outside of it.
  document.addEventListener("click", (e) => {
    if (userMenu.classList.contains("scale-100") && !userMenu.contains(e.target) && !e.target.matches("#profile-picture")) {
      toggleUserMenu();
    }
  });

  // Simulate a user logging out
  btnLogOut.addEventListener("click", () => {
    profilePicture.src = "./img/person-circle.svg";
    btnLogOut.innerText = "Sign in";

    const userName = document.querySelectorAll(".username");
    userName.forEach((user) => user.innerHTML = "");
  });

  function loadTasks() {
    myTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    console.log(myTasks);

    for (const key in myTasks) {
      if (myTasks.hasOwnProperty(key)) {
        showTask(myTasks[key]);
      }
    }
  }

  loadTasks();

  function saveTasksToLocalStorage(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
}

document.addEventListener("DOMContentLoaded", initApp);