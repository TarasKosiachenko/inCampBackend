const database = require("../database");

class TasksModel {
  getAllTasks() {
    return database("tasks").select("*");
  }

  getTaskById(task_id) {
    return database("tasks").where("id", task_id);
  }

  getTasksByListId(list_id) {
    return database("tasks").select("*").where("list_id", list_id);
  }

  createTask(task) {
    return database("tasks")
      .insert([
        { list_id: task.list_id },
        { name: task.name },
        { description: task.description },
        { done: task.done },
        { due_date: task.due_date },
      ])
      .returning("*");
  }

  replacingTask(task_id, list_id, name, description, done, due_date) {
    return database("tasks").where("id", task_id).update(
      {
        list_id: list_id,
        name: name,
        description: description,
        done: done,
        due_date,
        due_date,
      },
      ["task_id", "list_id", "name", "description", "done", "due_date"]
    );
  }

  deleteTask(task_id) {
    return database("tasks").where("id", task_id).del();
  }
}

module.exports = new TasksModel();
