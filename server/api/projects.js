const express = require('express')
const router = express.Router()
const {Project} = require('../db')

router.get('/', async (req, res, next) => {
  try {
    const projects = await Project.findAll()
    res.json(projects)
  } catch (err) {
    next(err)
  }
  console.log('here')
  res.end()
})

module.exports = router;
