const Sequelize = require('sequelize')
const db = require('./database')

const Robot = db.define('robot', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: { notEmpty: true }
  },
  imageUrl: {
    type: Sequelize.STRING,
  },
  fuelType: {
    type: Sequelize.ENUM('electric', 'gas', 'diesel'),
    defaultValue: 'electric',
  },
  fuelLevel: {
    type: Sequelize.FLOAT,
    validate: { min: 0, max: 100 },
    defaultValue: 100,
  },
})

module.exports = Robot
