const database = require("../database");

class DashboardsModel {
  async getCountsTasksAndLists() {
    const getCountofTasksOnDueDate = await await database("tasks")
      .where("due_date", "now()")
      .andWhere("done", "false")
      .count("*");

    const getListsTasksUndone = await await database("tasks")
      .select(
        "lists.id",
        "lists.title",
        database.raw("COUNT(tasks.done=false OR null)::INT AS undone")
      )
      .rightJoin("lists", function () {
        this.on("tasks.list_id", "=", "lists.id");
      })
      .groupBy("lists.id");

    const [todayTaskRes, list] = await Promise.all([
      getCountofTasksOnDueDate[0],
      getListsTasksUndone,
    ]);

    return {
      ...todayTaskRes,
      list,
    };
  }
}

module.exports = new DashboardsModel();
