// const Sequelize = require('sequelize')
// const db = require('./database')

// const Robot = db.define('robot', {
//   name: {
//     allowNull: false,
//     type: Sequelize.STRING,
//     validate: { notEmpty: true },
//   },
//   imageUrl: {
//     type: Sequelize.STRING,
//   },
//   fuelType: {
//     type: Sequelize.ENUM('electric', 'gas', 'diesel'),
//     defaultValue: 'electric',
//     // type: Sequelize.STRING,
//     // validate: {
//     //   isIn: [['gas', 'diesel', 'electric']], // This also works
//     // }
//   },
//   fuelLevel: {
//     type: Sequelize.FLOAT,
//     validate: { min: 0, max: 100 },
//     defaultValue: 100,
//   },
// })

// module.exports = Robot
