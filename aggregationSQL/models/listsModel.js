const database = require("../database");

class ListsModel {
  getAllLists() {
    return database.query("SELECT * FROM lists").then((data) => data.rows);
  }

  getListsById(list_id) {
    return database
      .query("SELECT * FROM lists WHERE id = $1", [list_id])
      .then((data) => data.rows);
  }

  getTaskById(list_id, all) {
    if (all === undefined || all === "false") {
      return database
        .query("SELECT * FROM tasks WHERE list_id = $1 AND done = false", [
          list_id,
        ])
        .then((data) => data.rows);
    } else {
      return database
        .query("SELECT * FROM tasks WHERE list_id = $1", [list_id])
        .then((data) => data.rows);
    }
  }

  createList(title) {
    return database
      .query("INSERT INTO lists (title) values ($1) RETURNING *", [title])
      .then((data) => data.rows);
  }

  replacingList(list_id, title) {
    return database
      .query("UPDATE lists set title = $2 WHERE id = $1 RETURNING *", [
        list_id,
        title,
      ])
      .then((data) => data.rows);
  }

  deleteList(list_id) {
    return database
      .query("DELETE FROM lists WHERE id = $1", [list_id])
      .then((data) => data.rows);
  }
}

module.exports = new ListsModel();
