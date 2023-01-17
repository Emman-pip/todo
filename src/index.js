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

  const addProject = document.createElement("div");
  addProject.textContent = "add project";
  addProject.classList.add("addProject");
  sidebar.appendChild(addProject);

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

  addTask.onclick = (event) => {
    event.preventDefault();
    appearScreen(content);
  };
})();

//data factory
const dataFactory = (title, description, due) => {
  return { title, description, due };
};

//array function
const array = (() => {
  const emptyArray = [];
  if (localStorage.getItem("storage") == undefined) {
    localStorage.setItem("storage", JSON.stringify(emptyArray));
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
    displayData(content);
  };

  cancel.onclick = (event) => {
    event.preventDefault();
  };
}

//to store data
function storeData(data) {
  const array = JSON.parse(localStorage.getItem("storage"));
  array.push(data);
  localStorage.setItem("storage", JSON.stringify(array));
  //console.log(localStorage.getItem("storage"));
}

//display data
function displayData(content) {
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
  });
}
