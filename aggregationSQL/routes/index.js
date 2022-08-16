const express = require("express");
const router = express.Router();

const routTask = require("./routTask");
const routList = require("./routList");
const routDashboard = require("./routDashboard");
const routCollection = require("./routCollection");

router.use("/tasks", routTask);
router.use("/lists", routList);
router.use("/dashboard", routDashboard);
router.use("/collection/today", routCollection);

module.exports = router;