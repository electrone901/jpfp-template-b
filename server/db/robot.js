const Sequelize = require('sequelize')
const db = require('./database')

const Robot = db.define('robot', {
  name: {
    allowNull: false,
    type: Sequelize.STRING,
    validate: { notEmpty: true },
  },
  imageUrl: {
    type: Sequelize.STRING,
  },
  fuelType: {
    type: Sequelize.STRING,
  },
  fuelLevel: {
    type: Sequelize.FLOAT,
  },
})

module.exports = Robot
