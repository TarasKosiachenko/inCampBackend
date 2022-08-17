const { Sequelize, Model, DataTypes } = require('sequelize');

const sequelize = new Sequelize('aggregation', 'aggregation_app', 'tarasko', {
  host: 'localhost',
  dialect: 'postgres'
});

class List extends Model {}
List.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  sequelize,
  modelName: 'list',
  timestamps: false
})

async function getAllLists() {
  return await List.findAll()
}
async function createLists(title) {
  return await List.create({ title: title })
}
async function updateLists(title, id) {
  return await List.update({ title: title }, {
    where: {
      id: id
    }
  })
}
async function deleteLists(id) {
  return await List.destroy({
    where: {
      id: id
    }
  })
}


class Task extends Model {}
Task.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  list_id: {
    type: DataTypes.INTEGER,
  },
  done: {
    type: DataTypes.BOOLEAN,
  },
  due_date: {
    type: DataTypes.DATE
  }
}, {
  sequelize,
  modelName: 'task',
  timestamps: false
})

List.hasMany(Task, {
  foreignKey: 'id'
});
Task.belongsTo(List)

async function getAllTasksForToday() {
  return await Task.findAll()
}

module.exports = {
  getAllLists,
  createLists,
  updateLists,
  deleteLists,
  getAllTasksForToday
} 