const Todo = require('../models/Todo')

class TodoController {
  find() {
    return Todo.find()
  }
  create(todo) {
    return Todo.create(todo)
  }
  findById(id) {
    return Todo.findById(id)
  }
  removeById(id) {
    return Todo.findByIdAndRemove(id)
  }
  updateById(id, todo) {
    return Todo.findByIdAndUpdate(id, todo, { new: true })
  }
}

module.exports = new TodoController()
