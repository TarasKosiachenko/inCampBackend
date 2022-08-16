const express = require("express");
const router = express.Router();

const collectionController = require("../controllers/collectionController");

router.get("/", collectionController.getToday);

module.exports = router;