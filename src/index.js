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

  addTask.onclick = () => {
    appearScreen();
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
function appearScreen() {
  const div = document.createElement("div");
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
}
