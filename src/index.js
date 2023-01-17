import _ from "lodash";
import "./style.css";

const structure = (name = "tasks") => {
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
  text.textContent = name;

  const addTask = document.createElement("button");
  addTask.textContent = "+Add";

  topScreen.appendChild(addTask);
  screen.appendChild(content);
  content.classList.add("content");

  displayData(content);
  displayDataProjects(projects);

  addProject.onclick = (event) => {
    event.preventDefault();
    appearScreenProjects(projects);
  };

  addTask.onclick = (event) => {
    event.preventDefault();
    appearScreen(content);
  };
};
structure();

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

  cancel.onclick = (event) => {
    event.preventDefault();
    removeItem(document.body, div);
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
    removeItem(document.body, div);
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

    radio.onclick = () => {
      removeItem(content, div);
      const toRemove = [];
      const final = [];
      const toProcess = JSON.parse(localStorage.getItem("storage"));
      toProcess.forEach((event) => {
        toRemove.push(JSON.stringify(event));
      });
      let lol = "";
      toRemove.forEach((event) => {
        if (event.includes(title.textContent)) {
          lol = event;
        }
      });

      toRemove.splice(lol, 1);
      toRemove.forEach((event) => {
        final.push(JSON.parse(event));
      });
      localStorage.setItem("storage", JSON.stringify(final));
    };
  });
}

//to remove child
function removeItem(parent, child) {
  parent.removeChild(child);
}

//display projects
function displayDataProjects(content) {
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
      const toRemove = [];
      const final = [];
      const toProcess = JSON.parse(localStorage.getItem("storage2"));
      toProcess.forEach((event) => {
        toRemove.push(JSON.stringify(event));
      });
      let lol = "";
      toRemove.forEach((event) => {
        if (event.includes(title.textContent)) {
          lol = event;
        }
      });

      toRemove.splice(lol, 1);
      toRemove.forEach((event) => {
        final.push(JSON.parse(event));
      });
      localStorage.setItem("storage2", JSON.stringify(final));
    };

    title.onclick = (event) => {
      event.preventDefault();
      document.body.innerHTML = "";
      structure(object.name);
    };
  });
}

//to add projects

//todo:  fix bug in local storage
