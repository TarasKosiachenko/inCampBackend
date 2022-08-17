const express = require("express");
const router = express.Router();

const routList = require("./routList");
const routCollection = require("./routCollection");

router.use("/lists", routList);
router.use("/collection/today", routCollection);

module.exports = router;