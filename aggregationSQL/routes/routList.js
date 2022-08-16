const express = require("express");
const router = express.Router();

const listsController = require("../controllers/listsController");

router.get("/", listsController.get);

router.get("/:id", listsController.getListsById);

router.get("/:id/tasks", listsController.getTasksById);

router.post("/", listsController.createList);

router.put("/:id", listsController.replacingList);

router.patch("/:id", listsController.replacingList);

router.delete("/:id", listsController.deleteList);

module.exports = router;