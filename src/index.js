import _ from "lodash";
import "./style.css";

//git subtree push --prefix dist origin gh-pages
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

function storeDataToProjects(data, name) {
  array3(name);
  const array = JSON.parse(localStorage.getItem(`${name}`));
  array.push(data);
  localStorage.setItem(`${name}`, JSON.stringify(array));
}

const array3 = (name) => {
  const emptyArray = [];
  if (localStorage.getItem(name) == undefined) {
    localStorage.setItem(name, JSON.stringify(emptyArray));
  }
};

const structure = (name) => {
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

  const all = document.createElement("button");
  all.textContent = "General Tasks";
  all.classList.add("addProject");
  sidebar.appendChild(all);

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

  array3(name);

  ifELse(name, content);

  displayDataProjects(projects, name);

  addProject.onclick = (event) => {
    event.preventDefault();
    appearScreenProjects(projects, content);
  };

  addTask.onclick = (event) => {
    event.preventDefault();
    appearScreen(content, name);
  };
  all.onclick = (event) => {
    document.body.innerHTML = "";
    event.preventDefault();
    structure("General Tasks");
  };
};

structure("General Tasks");

function ifELse(name, content) {
  if (name == "General Tasks") {
    displayData(content);
  } else {
    displayDataofProjects(content, name);
  }
}

//appear screen for projects
function appearScreenProjects(content, content2) {
  const div = document.createElement("form");
  div.classList.add("appProject");
  document.body.appendChild(div);

  const title = document.createElement("input");
  title.placeholder = "Project title";
  title.style.width = "100%";
  div.appendChild(title);

  const post = document.createElement("button");
  post.textContent = "post";
  div.appendChild(post);

  const cancel = document.createElement("button");
  cancel.textContent = "cancel";
  div.appendChild(cancel);

  post.onclick = (event) => {
    if (!(title.value == "")) {
      toPostProjects(event, title.value, content, content2, document.body, div);
    } else {
      alert("Put an appropriate project title!");
    }
  };

  cancel.onclick = (event) => {
    event.preventDefault();
    removeItem(document.body, div);
  };
}

function toPostProjects(event, title, content, content2, parent, div) {
  event.preventDefault();
  const data = projectFactory(title);
  storeDataProjects(data);
  displayDataProjects(content, content2);
  removeItem(parent, div);
}

//data factory
const dataFactory = (title, description, due) => {
  return { title, description, due };
};

//data factory
const projectFactory = (name) => {
  return { name };
};

//appearing screen
function appearScreen(content, name) {
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
    if (!(title.value == "")) {
      toPost(
        name,
        content,
        title.value,
        div,
        document.body,
        event,
        description.value,
        date.value
      );
    } else {
      alert("Put an appropriate title!");
    }
  };

  cancel.onclick = (event) => {
    event.preventDefault();
    removeItem(document.body, div);
  };
}

function toPost(name, content, title, div, parent, event, description, date) {
  removeItem(parent, div);
  event.preventDefault();
  const data = dataFactory(title, description, date);
  if (name === "General Tasks") {
    storeData(data);
    displayData(content);
  } else {
    storeDataToProjects(data, name);
    displayDataofProjects(content, name);
  }
}
// to store data from projects

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
  displayStuff(content, "storage");
}
//display data of projects
function displayDataofProjects(content, name) {
  displayStuff(content, name);
}

function displayStuff(content, name) {
  content.innerHTML = "";
  JSON.parse(localStorage.getItem(name)).forEach((object) => {
    const div = document.createElement("div");
    div.classList.add("line");
    content.appendChild(div);

    const div2 = document.createElement("div");
    div.appendChild(div2);
    div2.classList.add("line2");

    const radio = document.createElement("input");
    radio.type = "radio";
    div2.appendChild(radio);

    let title = document.createElement("p");
    title.textContent = object.title;
    div2.appendChild(title);

    title.addEventListener("click", (event) => {
      event.preventDefault();
      if (
        div.innerHTML ==
        `<div class="line2"><input type="radio"><p>${object.title}</p></div>`
      ) {
        showDesc(div, object);
      } else {
        displayStuff(content, name);
      }
      //structure(object.name);
      //appearScreenProjects(document.body, name, object.title);
    });

    radio.onclick = () => {
      radioFunc(content, div, name, title.textContent);
    };
  });
}

function showDesc(div, name) {
  if (localStorage.getItem(name.title) == undefined) {
    localStorage.setItem(name.title, JSON.stringify(name));
  }
  const data = document.createElement("div");
  data.classList.add("descc");
  div.appendChild(data);

  const desc = document.createElement("textarea");
  desc.cols = "30";
  desc.rows = "10";
  desc.value = JSON.parse(localStorage.getItem(name.title)).description;

  data.appendChild(desc);

  desc.addEventListener("keyup", () => {
    const de = JSON.parse(localStorage.getItem(name.title));
    de.description = desc.value;
    localStorage.setItem(name.title, JSON.stringify(de));
    desc.value = de.description;
    //localStorage.setItem(name.title)
  });

  const date = document.createElement("p");
  date.textContent = `DUE: ${name.due}`;
  data.appendChild(date);
}

function radioFunc(content, div, name, title) {
  removeItem(content, div);
  const toRemove = [];
  const final = [];
  const toProcess = JSON.parse(localStorage.getItem(name));
  toProcess.forEach((event) => {
    toRemove.push(event);
  });
  let lol = "";
  toRemove.forEach((event) => {
    if (event.title == title) {
      lol = event;
    }
  });
  toRemove.splice(toRemove.indexOf(lol), 1);
  toRemove.forEach((event) => {
    final.push(event);
  });
  localStorage.setItem(name, JSON.stringify(final));
}

//to remove child
function removeItem(parent, child) {
  parent.removeChild(child);
}

//display projects
function displayDataProjects(content, name) {
  content.innerHTML = "";
  JSON.parse(localStorage.getItem("storage2")).forEach((object) => {
    const div = document.createElement("div");
    div.classList.add("color");
    content.appendChild(div);

    const title = document.createElement("button");
    title.innerHTML = object.name;
    title.style.width = "90%";
    title.classList.add("change");
    div.appendChild(title);

    const x = document.createElement("button");
    x.textContent = "X";
    x.classList.add("x");
    x.classList.add("change");
    x.style.width = "10%";
    div.appendChild(x);

    x.onclick = () => {
      xBtn(content, div, title.textContent, name);
    };

    title.onclick = (event) => {
      document.body.innerHTML = "";
      event.preventDefault();
      structure(object.name);
      displayDataofProjects(content, name);
    };
  });
}

function xBtn(content, div, title, name) {
  localStorage.removeItem(name);
  localStorage.removeItem(name);
  removeItem(content, div);
  const toRemove = [];
  const final = [];
  const toProcess = JSON.parse(localStorage.getItem("storage2"));
  toProcess.forEach((event) => {
    toRemove.push(JSON.stringify(event));
  });
  let lol = "";
  toRemove.forEach((event) => {
    if (event.includes(title)) {
      lol = event;
    }
  });
  toRemove.splice(toRemove.indexOf(lol), 1);
  toRemove.forEach((event) => {
    final.push(JSON.parse(event));
  });
  localStorage.setItem("storage2", JSON.stringify(final));
  document.body.innerHTML = "";
  structure("General Tasks");
}
