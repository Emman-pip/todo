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

  if (name == "General Tasks") {
    displayData(content);
  } else {
    displayDataofProjects(content, name);
  }

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
    event.preventDefault();
    const data = projectFactory(title.value);
    storeDataProjects(data);
    displayDataProjects(content, content2);
    removeItem(document.body, div);
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
    removeItem(document.body, div);
    event.preventDefault();
    const data = dataFactory(title.value, description.value, date.value);
    if (name === "General Tasks") {
      storeData(data);
      displayData(content);
    } else {
      storeDataToProjects(data, name);
      displayDataofProjects(content, name);
    }
  };

  cancel.onclick = (event) => {
    event.preventDefault();
    removeItem(document.body, div);
  };
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
  content.innerHTML = "";
  JSON.parse(localStorage.getItem("storage")).forEach((object) => {
    const div = document.createElement("div");
    div.classList.add("strip");
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
//display data of projects
function displayDataofProjects(content, name) {
  content.innerHTML = "";
  JSON.parse(localStorage.getItem(name)).forEach((object) => {
    const div = document.createElement("div");
    div.classList.add("line");
    content.appendChild(div);

    const radio = document.createElement("input");
    radio.type = "radio";
    div.appendChild(radio);

    const title = document.createElement("p");
    title.textContent = object.title;
    div.appendChild(title);

    title.onclick = (event) => {
      document.body.innerHTML = "";
      event.preventDefault();
      structure(object.name);
      appearScreenProjects(document.body, name, object.title);
    };

    radio.onclick = () => {
      removeItem(content, div);
      const toRemove = [];
      const final = [];
      const toProcess = JSON.parse(localStorage.getItem(name));
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
      localStorage.setItem(name, JSON.stringify(final));
    };
  });
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
    div.classList.add("line");
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
        if (event.includes(title.textContent)) {
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
    };

    title.onclick = (event) => {
      document.body.innerHTML = "";
      event.preventDefault();
      structure(object.name);
      displayDataofProjects(content, name);
    };
  });
}

//to do: fix the X button(it must clear the whole storage for that shit)
