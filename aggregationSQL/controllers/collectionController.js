const collectionModel = require("../models/collectionModel");

class CollectionController {
  async getToday(req, res) {
    collectionModel.getAllTasksForToday().then((lists) => res.json(lists));
  }
}

module.exports = new CollectionController();
