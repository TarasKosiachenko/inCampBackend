const express = require("express");
const router = express.Router();

const tasksController = require("../controllers/tasksController");

router.get("/", tasksController.get);

router.get("/:id", tasksController.getTaskById);

router.post("/", tasksController.createTask);

router.put("/:id", tasksController.replacingTask);

router.patch("/:id", tasksController.updateTask);

router.delete("/:id", tasksController.deleteTask);

module.exports = router;