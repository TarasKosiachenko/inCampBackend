const express = require("express");
const app = express();

function logRequest({ method, url }, res, next) {
  console.log(`[${new Date().toISOString()}] ${method} ${url}`);
  next();
}

app.use(express.json());
app.use(logRequest);

const inc = (init = 0) => () => ++init;
const genId = inc();
const todoitem = [
  { id: genId(), title: "Get task" },
  { id: genId(), title: "Create task" },
];
const createTask = (data) => {
  return {
    id: genId(),
    title: data.title,
    done: false,
  };
};

// Getting a list of all todoitem > curl localhost:5000/todoitem
app.get("/todoitem", (req, res) => res.json(todoitem));

// Creating a new todoitem > curl localhost:5000/todoitem -d '{ "title": "Generate ID" }' -H 'Content-type: application/json'
app.post("/todoitem", (req, res) => {
  const todo = createTask(req.body);
  todoitem.push(todo);
  res.json(todo);
});

// Edit todoitem > curl -X PATCH localhost:5000/todoitem/1 -d '{ "done": true }' -H 'Content-type: application/json'
app.patch("/todoitem/:id", (req, res) => {
  const todoId = parseInt(req.params.id);
  const todo = todoitem.find((t) => t.id === todoId);

  if (todo) {
    Object.assign(todo, req.body);
    res.json(todo);
  } else {
    res.status(404).json({ error: "Task not found" });
  }
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server at localhost:${port}`);
});