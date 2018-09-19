'use strict'

// The sole purpose of this module is to establish a connection to your
// Postgres database by creating a Sequelize instance (called `db`).
// You shouldn't need to make any modifications here.

const chalk = require('chalk')
const Sequelize = require('sequelize')
const pkg = require('../../package.json')

console.log(chalk.yellow('Opening database connection'))

// create the database instance that can be used in other database files
const dbName = process.env.NODE_ENV === 'test' ? `${pkg.name}-test` : pkg.name;
const db = new Sequelize(`postgres://localhost:5432/${dbName}`, {
  logging: false, // so we don't see all the SQL queries getting made
  operatorsAliases: false,
})

module.exports = db
