const { Pool } = require("pg");

const pool = new Pool({
  user: "aggregation_app",
  host: "127.0.0.1",
  database: "aggregation",
  password: "tarasko",
});


const dashboard = async(req,res) =>{
  const promiseNumTasks =  await pool.query('SELECT COUNT(*) AS today FROM tasks WHERE due_date = DATE(NOW())')
  const promiseListSortTasks = await pool.query('SELECT lists.id, lists.title, COUNT(*) FROM tasks RIGHT JOIN lists ON tasks.list_id = lists.id WHERE done=false GROUP BY lists.id')
  Promise.all([...promiseNumTasks.rows, promiseListSortTasks.rows]).then(result=> res.send(result))
}

const getTaskToday = async (req, res) => {
    const { rows } = await pool.query("SELECT tasks.id, tasks.name, lists.title FROM tasks JOIN lists ON tasks.list_id = lists.id WHERE due_date BETWEEN DATE(NOW()) AND DATE(NOW()) GROUP BY tasks.id, tasks.name, lists.title");
    res.send(rows);
};

const getTaskList = async (req, res) => {
  const listid = parseInt(req.params.listid);
  const all = req.query.all;
  if (!listid) {
    const { rows } = await pool.query("SELECT * FROM tasks");
    res.send(rows);
  } else {
    const { rows } = await pool.query(
      "SELECT * FROM tasks WHERE list_id=$1 AND done=$2 ",
      [listid, all]
    );
    res.send(rows);
  }
};

const createTask = async (req, res) => {
  const task = {
    name: req.query.name,
    done: req.query.done,
    list_id: req.query.list_id,
  };
  await pool.query(
    'INSERT INTO tasks (name, done, list_id) VALUES ($1, $2, $3)',
    [task.name, task.done, task.list_id]
  );
  res.send(`Task added`);
};

const updateTask = async (req, res) => {
  const task = {
    title: req.query.title,
    done: req.query.done,
    listID: req.query.listID,
    id: req.query.id,
  };
  await pool.query(
    'UPDATE tasks SET title=$1, done=$2, "listID"=$3 WHERE id=$4',
    [task.title, task.done, task.listID, task.id]
  );
  res.send(`Task modified`);
};

const deleteTask = async (req, res) => {
  const id = parseInt(req.query.id);
  await pool.query("DELETE FROM tasks WHERE id = $1", [id]);
  res.send(`Task deleted`);
};

module.exports = {
  dashboard,
  getTaskToday,
  getTaskList,
  createTask,
  updateTask,
  deleteTask,
};
