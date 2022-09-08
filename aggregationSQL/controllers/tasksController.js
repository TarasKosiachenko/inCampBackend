const tasksModel = require("../models/tasksModel");

class TasksController {
  async get(req, res) {
    const list_id = parseInt(req.query.list_id);
    list_id
      ? tasksModel.getTasksByListId(list_id).then((tasks) => res.json(tasks))
      : tasksModel.getAllTasks().then((tasks) => res.json(tasks));
  }

  async getTaskById(req, res) {
    const task_id = parseInt(req.params.id);
    tasksModel.getTaskById(task_id).then((task) => res.json(task));
  }

  async createTask(req, res) {
    const { list_id, name, description, done, due_date } = req.body;
    list_id
      ? tasksModel
          .createTask(list_id, name, description, done, due_date)
          .then((task) => res.json(task))
      : res.status("400").json({ Error: "List ID not found" });
  }

  async replacingTask(req, res) {
    const task_id = parseInt(req.params.id);
    let { list_id, name, description, done, due_date } = req.body;

    if (list_id === undefined) {
      return res.status("400").json({ Error: "List ID not found" });
    }

    tasksModel
      .replacingTask(task_id, list_id, name, description, done, due_date)
      .then((task) => res.json(task));
  }

  async updateTask(req, res) {
    const task_id = parseInt(req.params.id);
    const { list_id, name, description, done, due_date } = req.body;

    tasksModel
      .replacingTask(task_id, list_id, name, description, done, due_date)
      .then((task) => res.json(task));
  }

  async deleteTask(req, res) {
    const task_id = parseInt(req.params.id);
    // const task =  
    tasksModel
      .deleteTask(task_id)
      .then((task) => res.json(task));
  }
}

module.exports = new TasksController();
