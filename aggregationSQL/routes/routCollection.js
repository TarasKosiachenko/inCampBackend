const express = require("express");
const router = express.Router();
const database = require("../database")

router.get("/", getAllTasksForToday);

function getAllTasksForToday(req,res){
    database.getAllTasksForToday().then(result=> res.send(result))
}

module.exports = router;