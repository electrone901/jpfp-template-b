const router = require('express').Router()
const Robot = require('../db/robot')

// ASYNC AWAIT SOLUTION
router.get('/', async (req, res, next) => {
  try {
    console.log('Robot.findAll', Robot.findAll)
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

module.exports = router
