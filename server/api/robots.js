const router = require('express').Router()
const Robot = require('../db/robot')
const Project = require('../db/project')

// ASYNC AWAIT SOLUTION
router.get('/', async (req, res, next) => {
  try {
    const robots = await Robot.findAll()
    res.json(robots)
  } catch (error) {
    // res.sendStatus(500) // this also works I guess
    next(error)
  }
})
// DOT THEN SOLUTION
// router.get('/', (req, res, next) => {
//   Robot.findAll()
//   .then(robots => {
//     res.json(robots)
//   })
//   .catch(err => {
//     next(err)
//   })
// })

router.get('/:id', async (req, res, next) => {
  try {
    const id = +req.params.id
    const robot = await Robot.findById(id, {
      include: Project
    })
    if (!robot) return res.sendStatus(404)
    res.json(robot)
  } catch (error) {
    next(error)
  }
})

module.exports = router
