const Sequelize = require('sequelize')
const db = require('./database')

const Project = db.define('project', {
  title: Sequelize.STRING,
  deadline: Sequelize.DATE,
  priority: Sequelize.INTEGER,
  completed: Sequelize.BOOLEAN,
  description: Sequelize.TEXT
})

module.exports = Project
