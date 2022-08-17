const listsModel = require("../models/listsModel");

class ListsController {
  async get(req, res) {
    listsModel.getAllLists().then((lists) => res.json(lists));
  }

  async getListsById(req, res) {
    const list_id = parseInt(req.params.id);

    listsModel.getListsById(list_id).then((list) => res.json(list));
  }

  async getTasksById(req, res) {
    const list_id = parseInt(req.params.id);
    const { all } = req.query;

    listsModel.getTaskById(list_id, all).then((list) => res.json(list));
  }

  async createList(req, res) {
    const { title } = req.body;

    listsModel.createList(title).then((list) => res.json(list));
  }

  async replacingList(req, res) {
    const list_id = parseInt(req.params.id);
    const { title } = req.body;

    listsModel.replacingList(list_id, title).then((list) => res.json(list));
  }

  async updateList(req, res) {
      const list_id = parseInt(req.params.id);
      const { title } = req.body;
      listsModel.replacingList(list_id, title).then(list => res.json(list));
  };

  async deleteList(req, res) {
    const list_id = parseInt(req.params.id);
    listsModel
      .deleteList(list_id)
      .then((list) => res.json(`List with ID ${list_id} was deleted!`));
  }
}

module.exports = new ListsController();
