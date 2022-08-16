const express = require('express')
const router = express.Router();
const db = require('../db')


router.get('/tasks', db.getTask)
router.post('/tasks', db.createTask)
router.patch('/tasks', db.updateTask)
router.delete('/tasks', db.deleteTask)


module.exports = router