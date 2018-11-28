const Sequelize = require('sequelize')
const db = require('./database')

const Project = db.define('project', {
  title: {
    allowNull: false,
    type: Sequelize.STRING,
    validate: { notEmpty: true },
  },
  description: {
    type: Sequelize.TEXT,
  },
})

module.exports = Project
