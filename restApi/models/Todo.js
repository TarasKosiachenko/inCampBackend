const mongoose = require('mongoose')
const TodoSchema = new mongoose.Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  createdAt: {type: Date, default: Date.now }
})

const Todo = mongoose.model('Todo', TodoSchema, 'todos')

module.exports = Todo