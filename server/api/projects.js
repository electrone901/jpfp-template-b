const express = require('express')
const router = express.Router()
const { Project, Robot } = require('../db')

router.get('/', async (req, res, next) => {
  try {
    const projects = await Project.findAll()
    res.json(projects)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const id = +req.params.id
    const project = await Project.findById(id, {
      include: Robot
    })
    if (!project) return res.sendStatus(404)
    res.json(project)
  } catch (error) {
    next(error)
  }
})

module.exports = router;
