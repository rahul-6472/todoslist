const getTodos = async () => {
  try {
    let todoRes = await fetch(`http://localhost:3000/tasks`);
    let todosData = await todoRes.json();
    console.log(todosData);
    displayTodo(todosData);
  } catch (err) {
    console.log(err);
  }
};

getTodos();

const displayTodo = (todosData) => {
  todosData.forEach((todo) => {
    let tbody = document.getElementById("tbody");

    let trow = document.createElement("tr");

    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");

    td1.innerText = todo.id;
    td2.innerText = todo.title;
    td3.innerText = todo.status;
    if (todo.status == true) {
      td2.style.color = "green";
    } else {
      td2.style.color = "red";
    }

    trow.append(td1, td2, td3);
    tbody.append(trow);
  });
};

const createTodo = async () => {
  try {
    let title = document.getElementById("title").value;

    let status = document.getElementById("status1");
    if (status.checked == true) {
      status = true;
    } else {
      status = false;
    }

    let body = {
      title,
      status,
    };

    let res = await fetch(`http://localhost:3000/tasks`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
    let data = await res.json();
    console.log(data);
    displayTodo(data);
  } catch (error) {
    console.log(error);
  }
};

document.getElementById("add").addEventListener("click", createTodo);
