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

  async createTask(body) {
    return await database("tasks").insert(body).returning("*");
  }

  async replacingTask(task_id, body) {
    return await database("tasks").where("id", task_id).update(body).returning("*");
  }

  deleteTask(task_id) {
    return database("tasks").where("id", task_id).del();
  }
}

module.exports = new TasksModel();
