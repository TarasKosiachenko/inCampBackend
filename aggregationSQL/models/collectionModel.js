const database = require("../database");

class CollectionModel {
  getAllTasksForToday() {
    return database
      .query(
        "SELECT *, tasks.id, lists.title  FROM tasks LEFT JOIN lists ON lists.id=list_id WHERE due_date <= DATE(NOW()) AND done = false ORDER BY due_date"
      )
      .then((result) =>
        result.rows.map(
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
