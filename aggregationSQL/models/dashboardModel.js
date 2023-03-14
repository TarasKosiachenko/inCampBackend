const database = require("../database");

class DashboardsModel {
  async getCountsTasksAndLists() {
    const getCountofTasksOnDueDate = await (
      await database.query(
        "SELECT COUNT(*)::INT  AS today FROM tasks WHERE due_date = DATE(NOW()) AND done=false "
      )
    ).rows;

    const getListsTasksUndone = await (
      await database.query(
        "SELECT lists.id, lists.title, COUNT(tasks.done=false OR null)::INT AS undone FROM tasks RIGHT JOIN lists ON tasks.list_id = lists.id  GROUP BY lists.id ORDER BY id"
      )
    ).rows;

    const [todayTaskRes, list] = await Promise.all([
      getCountofTasksOnDueDate[0],
      getListsTasksUndone
    ]);

    return {
      ...todayTaskRes,
      list,
    };
  }
}

module.exports = new DashboardsModel();
