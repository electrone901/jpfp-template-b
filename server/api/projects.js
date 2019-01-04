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

router.delete('/:id', async (req, res, next) => {
  try {
    const id = +req.params.id
    const project = await Project.findById(id)
    if (!project) return res.sendStatus(404)
    await Project.destroy({
      where: { id }
    })
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const body = [
      'title',
      'description',
      'deadline',
      'priority',
      'completed',
    ].reduce((acc, prop) => {
      const reqBodyProp = req.body.project[prop]
      if (reqBodyProp) {
        return {...acc, [prop]: reqBodyProp}
      }
      return acc
    }, {})
    const project = await Project.create(body)
    res.json(project)
  } catch (error) {
    next(error)
  }
})

module.exports = router;
