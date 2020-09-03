const Sequelize = require('sequelize')
const db = require('./database')

// defines Project models
const Project = db.define('project', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  deadline: Sequelize.DATE,
  priority: {
    type: Sequelize.INTEGER,
    validate: {
      min: 1,
      max: 10
    }
  },
  completed: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  description: Sequelize.TEXT
})

module.exports = Project
