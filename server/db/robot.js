const Sequelize = require('sequelize')
const db = require('./database')

// defines Robot models
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
    // value must be equal to  'gas', 'diesel', 'electric'
    type: Sequelize.ENUM('electric', 'gas', 'diesel'),
    defaultValue: 'electric',
    // type: Sequelize.STRING,
    // validate: {
    //   isIn: [['gas', 'diesel', 'electric']], // This also works
    // }
  },
  fuelLevel: {
    type: Sequelize.FLOAT,
    validate: { min: 0, max: 100 },
    defaultValue: 100,
  },
})

// class method sequelize hook: set a default imageUrl
Robot.beforeSave((robot) => {
  if (!robot.imageUrl) {
    robot.imageUrl = `https://robohash.org/${robot.name}.png`
  }
})

module.exports = Robot
