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

// Picks the array of props from an object and doesn't
// assign keys to the returned object that are falsey
const pickPropsFromObj = (props, obj) => {
  return props.reduce((acc, prop) => {
    const value = obj[prop]
    if (obj[prop]) {
      return {...acc, [prop]: value}
    }
    return acc
  }, {})
}

router.post('/', async (req, res, next) => {
  try {
    const robotData = pickPropsFromObj(
      ['name', 'fuelLevel', 'fuelType', 'imageUrl'],
      req.body.robot
    )
    const robot = await Robot.create(robotData)
    res.json(robot)
  } catch (error) {
    next(error)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const id = +req.params.id
    const foundRobot = await Robot.findById(id)
    if (!foundRobot) return res.sendStatus(404)

    const robotData = pickPropsFromObj(
      ['name', 'fuelLevel', 'fuelType', 'imageUrl'],
      req.body.robot
    )
    const robot = await foundRobot.update(robotData)
    res.json(robot)
  } catch (error) {
    next(error)
  }
})

module.exports = router
