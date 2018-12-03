const express = require('express')
const router = express.Router()
const { Project } = require('../db')

router.get('/', async (req, res, next) => {
  console.log('HELLO!!! PROJECT >>>>> ', Project)
  try {
    const projects = await Project.findAll()
    res.json(projects)
  } catch (err) {
    next(err)
  }
})

module.exports = router;
