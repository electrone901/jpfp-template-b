const router = require('express').Router()
const { Project, Robot } = require('../db')

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

router.delete('/:id', async (req, res, next) => {
  try {
    const id = +req.params.id
    const robot = await Robot.findById(id)
    if (!robot) return res.sendStatus(404)
    await Robot.destroy({
      where: { id }
    })
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const body = ['name', 'fuelLevel', 'fuelType', 'imageUrl'].reduce((acc, prop) => {
      const reqBodyProp = req.body.robot[prop]
      if (reqBodyProp) {
        return {...acc, [prop]: reqBodyProp}
      }
      return acc
    }, {})
    const robot = await Robot.create(body)
    res.json(robot)
  } catch (error) {
    next(error)
  }
})

module.exports = router
