const database = require("../database");

class TasksModel {
  getAllTasks() {
    return database.query("SELECT * FROM tasks").then((data) => data.rows);
  }

  getTaskById(task_id) {
    return database
      .query("SELECT * FROM tasks WHERE id = $1", [task_id])
      .catch(() => {
        console.log("Task not found");
        return "";
      })
      .then((data) => data.rows);
  }

  getTasksByListId(list_id) {
    return database
      .query("SELECT * FROM tasks WHERE list_id = $1", [list_id])
      .catch(() => {
        console.log("Task not found");
        return "";
      })
      .then((data) => data.rows);
  }

  createTask(list_id, name, description, done, due_date) {
    return database
      .query(
        "INSERT INTO tasks (list_id, name, description, done, due_date) values ($1, $2, $3, $4, $5) RETURNING *",
        [list_id, name, description, done, due_date]
      )
      .then((data) => data.rows);
  }

  replacingTask(task_id, list_id, name, description, done, due_date) {
    return database
      .query(
        "UPDATE tasks set list_id = COALESCE($1, list_id), name = COALESCE($2, name), description = COALESCE($3,description), done = COALESCE($4, done), due_date = COALESCE($5,due_date) WHERE id = $6 RETURNING *",
        [list_id, name, description, done, due_date, task_id]
      )
      .then((data) => data.rows);
  }

  deleteTask(task_id) {
    return database
      .query("DELETE FROM tasks WHERE id = $1 RETURNING *", [task_id])
      .then((data) => data.rows);
  }
}

module.exports = new TasksModel();
