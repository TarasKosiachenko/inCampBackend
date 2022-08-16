const { Client } = require('pg')

const client = new Client({
    user: 'todolist_app',
    host: '127.0.0.1',
    database: 'todolist',
    password: 'tarasko'
  })
  client.connect()


const getTask = async (req, res) => {
    const id = parseInt(req.query.listID)
    if(!id) {
        const { rows } = await client.query('SELECT * FROM items')
        res.send(rows)
    } else {
        const { rows } = await client.query('SELECT * FROM items WHERE "listID" = $1', [id])
        res.send(rows)
    }
}

const createTask = async (req, res) => {
    const task = {
      title: req.query.title,
      done: req.query.done,
      listID: req.query.listID
    }
    await client.query('INSERT INTO items (title, done, "listID") VALUES ($1, $2, $3)', [task.title, task.done, task.listID])
      res.send(`Task added`)
  }

  const updateTask = async (req, res) => {
    const task = {
      title: req.query.title,
      done: req.query.done,
      listID: req.query.listID,
      id: req.query.id
    }
    await client.query('UPDATE items SET title=$1, done=$2, "listID"=$3 WHERE id=$4', [task.title, task.done, task.listID, task.id])
    res.send(`Task modified`)
  }

  const deleteTask = async (req, res) => {
    const id = parseInt(req.query.id)
    await client.query('DELETE FROM items WHERE id = $1', [id])
      res.send(`Task deleted`)
  }

module.exports = {
    getTask,
    createTask,
    updateTask,
    deleteTask
}