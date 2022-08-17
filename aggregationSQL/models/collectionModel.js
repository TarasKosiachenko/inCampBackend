const database = require("../database");

class CollectionModel {
  getAllTasksForToday() {
    return database("tasks")
      .select("*", "lists.title")
      .leftJoin("lists", function () {
        this.on("lists.id", "=", "list_id");
      })
      .where("due_date", "2022-08-17")
      .then((result) =>
        result.map(
          ({ id, name, description, due_date, done, title, list_id }) => {
            return {
              id,
              name,
              description,
              due_date,
              done,
              list: { list_id, title },
            };
          }
        )
      );
  }
}

module.exports = new CollectionModel();
