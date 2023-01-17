import _ from "lodash";
import "./style.css";

const structure = (() => {
  const topBar = document.createElement("div");
  document.body.appendChild(topBar);
  topBar.textContent = "TodoList.io";
  topBar.classList.add("topBar");

  const main = document.createElement("div");
  document.body.appendChild(main);
  main.classList.add("main");

  const sidebar = document.createElement("div");
  sidebar.classList.add("sidebar");
  main.appendChild(sidebar);

  const addProject = document.createElement("button");
  addProject.textContent = "add project";
  addProject.classList.add("addProject");
  sidebar.appendChild(addProject);

  const projects = document.createElement("div");
  addProject.classList.add("projects");
  sidebar.appendChild(projects);

  const screen = document.createElement("div");
  main.appendChild(screen);
  screen.classList.add("screen");

  const topScreen = document.createElement("div");
  screen.appendChild(topScreen);
  topScreen.classList.add("topScreen");

  const content = document.createElement("div");
  const text = document.createElement("div");

  topScreen.appendChild(text);
  text.classList.add("contentText");
  text.textContent = "Tasks";

  const addTask = document.createElement("button");
  addTask.textContent = "+Add";

  topScreen.appendChild(addTask);
  screen.appendChild(content);
  content.classList.add("content");

  displayData(content, null);
  displayDataProjects(projects, null);

  addProject.onclick = (event) => {
    event.preventDefault();
    appearScreenProjects(projects);
  };

  addTask.onclick = (event) => {
    event.preventDefault();
    appearScreen(content);
  };
})();

//appear screen for projects
function appearScreenProjects(content) {
  const div = document.createElement("form");
  div.classList.add("appear");
  document.body.appendChild(div);

  const title = document.createElement("input");
  title.placeholder = "title";
  title.style.width = "100%";
  div.appendChild(title);

  const post = document.createElement("button");
  post.textContent = "post";
  div.appendChild(post);

  const cancel = document.createElement("button");
  cancel.textContent = "cancel";
  div.appendChild(cancel);

  post.onclick = (event) => {
    event.preventDefault();
    const data = projectFactory(title.value);
    storeDataProjects(data);
    displayDataProjects(content, data);
  };
}

//data factory
const dataFactory = (title, description, due) => {
  return { title, description, due };
};

//data factory
const projectFactory = (name) => {
  return { name };
};

//array function
const array = (() => {
  const emptyArray = [];
  if (localStorage.getItem("storage") == undefined) {
    localStorage.setItem("storage", JSON.stringify(emptyArray));
  }
})();

const array2 = (() => {
  const emptyArray = [];
  if (localStorage.getItem("storage2") == undefined) {
    localStorage.setItem("storage2", JSON.stringify(emptyArray));
  }
})();

//appearing screen
function appearScreen(content) {
  const div = document.createElement("form");
  div.classList.add("appear");
  document.body.appendChild(div);

  const title = document.createElement("input");
  title.placeholder = "title";
  title.style.width = "100%";
  div.appendChild(title);

  const description = document.createElement("textarea");
  description.cols = "100vw";
  description.rows = "10";
  description.placeholder = "description";
  div.appendChild(description);

  const date = document.createElement("input");
  date.type = "date";
  div.appendChild(date);

  const post = document.createElement("button");
  post.textContent = "post";
  div.appendChild(post);

  const cancel = document.createElement("button");
  cancel.textContent = "cancel";
  div.appendChild(cancel);

  post.onclick = (event) => {
    event.preventDefault();
    const data = dataFactory(title.value, description.value, date.value);
    storeData(data);
    displayData(content, data);
  };

  cancel.onclick = (event) => {
    event.preventDefault();
  };
}

//to store data for tasks
function storeData(data) {
  const array = JSON.parse(localStorage.getItem("storage"));
  array.push(data);
  localStorage.setItem("storage", JSON.stringify(array));
}

//to store data for projects
function storeDataProjects(data) {
  const array = JSON.parse(localStorage.getItem("storage2"));
  array.push(data);
  localStorage.setItem("storage2", JSON.stringify(array));
}

//display data
function displayData(content, item) {
  content.innerHTML = "";
  JSON.parse(localStorage.getItem("storage")).forEach((object) => {
    const div = document.createElement("div");
    div.classList.add("line");
    content.appendChild(div);

    const radio = document.createElement("input");
    radio.type = "radio";
    div.appendChild(radio);

    const title = document.createElement("p");
    title.textContent = object.title;
    div.appendChild(title);

    radio.onclick = () => {
      removeItem(content, div);
      const toremove = JSON.parse(localStorage.getItem("storage"));
      toremove.splice(toremove.indexOf(item), 1);
      localStorage.setItem("storage", JSON.stringify(toremove));
    };
  });
}

//to remove child
function removeItem(parent, child) {
  parent.removeChild(child);
}

//display data
function displayDataProjects(content, item) {
  content.innerHTML = "";
  JSON.parse(localStorage.getItem("storage2")).forEach((object) => {
    const div = document.createElement("div");
    div.classList.add("line");
    content.appendChild(div);

    const title = document.createElement("button");
    title.innerHTML = object.name;
    div.appendChild(title);

    const x = document.createElement("p");
    x.textContent = "x";
    div.appendChild(x);

    x.onclick = () => {
      removeItem(content, div);
      const toremove = JSON.parse(localStorage.getItem("storage2"));
      toremove.splice(toremove.indexOf(item), 1);
      localStorage.setItem("storage2", JSON.stringify(toremove));
    };
  });
}

//to add projects
