const database = require("../database");

class ListsModel {
  getAllLists() {
    return database("lists").select("*");
  }

  getListsById(list_id) {
    return database("lists").where("id", list_id);
  }

  getTaskById(list_id, all) {
    if (all === undefined || all === "false") {
      return database("tasks")
        .where("list_id", list_id)
        .andWhere("done", false);
    } else {
      return database("tasks").where("list_id", list_id);
    }
  }

  createList(title) {
    return database("lists").insert({ title: title });
  }

  replacingList(list_id, title) {
    return database("lists")
      .where({ id: list_id })
      .update({ title: title }, ["id", "title"]);
  }

  deleteList(list_id) {
    return database("lists").where("id", list_id).del();
  }
}

module.exports = new ListsModel();
