// The purpose of this module is to bring your Sequelize instance (`db`) together
// with your models, for which you'll find some blank files in this directory:

const Sequelize = require('sequelize')
const db = require('./database')
const Project = require('./project')
const Robot = require('./robot')

// This is a great place to establish associations between your models
// (https://sequelize-guides.netlify.com/association-types/).
// Example:

// Associates projects to have many robots through robot_projects  table
Project.belongsToMany(Robot, { through: 'robot_projects' })
Robot.belongsToMany(Project, { through: 'robot_projects' })

module.exports = {
  // Include your models in this exports object as well!
  db,
  Project,
  Robot,
}
