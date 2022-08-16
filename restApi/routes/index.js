const express = require("express");
const router = express.Router();

const inc = (init = 0) => () => ++init;
const genId = inc();
const tasksList = [
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

router.get("/todoitem", (req, res) => res.json(tasksList));

router.post("/todoitem", (req, res) => {
  const todo = createTask(req.body);
  tasksList.push(todo);
  res.json(todo);
});

router.patch("/todoitem/:id", (req, res) => {
  const todoId = parseInt(req.params.id);
  const todo = tasksList.find((t) => t.id === todoId);
  if (todo) {
    Object.assign(todo, req.body);
    res.json(todo);
  } else {
    res.status(404).json({ error: "Task not found" });
  }
});

router.delete("/todoitem/:id", (req, res) => {
  const { id } = req.params;
  const itemIndex = tasksList.findIndex((p) => p.id == id);
  const todo = tasksList.find((t) => t.id == id);
  if (todo) {
    tasksList.splice(itemIndex, 1);
    res.send();
  } else {
    res.status(404).json({ error: "Task not found" });
  }
});

router.put("/todoitem/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const todo = tasksList.find((t) => t.id == taskId);

  if (todo) {
    const { title, done } = req.body;
    console.log(req.body);
    const newTask = {
      id: taskId,
      title: title,
      done: done,
    };
    tasksList[tasksList.indexOf(todo)] = newTask;
    res.json(newTask);
  } else {
    res.status('404').json({ 'Error': 'Task not found' });
  }
}); 

module.exports = router;
