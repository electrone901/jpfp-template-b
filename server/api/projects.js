const express = require('express')
const router = express.Router()
const { Project, Robot } = require('../db')

//  api/projects => serves up all projects
router.get('/', async (req, res, next) => {
  try {
    const projects = await Project.findAll()
    res.json(projects)
  } catch (err) {
    next(err)
  }
})

//  api/projects/:id => serves up a project by id
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

//  api/projects/:id => deletes a project by id
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

// Picks the array of props from an object and doesn't
// assign keys to the returned object that are falsey
const pickPropsFromObj = (props, obj) => {
  return props.reduce((acc, prop) => {
    const value = obj[prop]
    if (obj[prop] || value === false) {
      return {...acc, [prop]: value}
    }
    return acc
  }, {})
}

//  api/projects => creates a project
router.post('/', async (req, res, next) => {
  try {
    const projectData = pickPropsFromObj(
      [
        'title',
        'description',
        'deadline',
        'priority',
      ],
      req.body
    )
    const project = await Project.create(projectData)
    res.json(project)
  } catch (error) {
    next(error)
  }
})

//  api/projects/id => updates a project by id
router.put('/:id', async (req, res, next) => {
  try {
    // + converts the id to a number
    const id = +req.params.id
    const foundProject = await Project.findById(id)
    if (!foundProject) return res.sendStatus(404)

    const projectData = pickPropsFromObj(
      [
        'title',
        'description',
        'deadline',
        'priority',
        'completed',
      ],
      req.body
    )
    const robot = await foundProject.update(projectData)
    res.json(robot)
  } catch (error) {
    next(error)
  }
})

module.exports = router;
