const dashboardModel = require("../models/dashboardModel");

class DashboardController {
  async get(req, res) {
    dashboardModel.getCountsTasksAndLists().then((lists) => res.json(lists));
  }
}

module.exports = new DashboardController();
