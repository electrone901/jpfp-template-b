const router = require('express').Router()
const Robot = require('../db/robot')

// ASYNC AWAIT SOLUTION
router.get('/', async (req, res, next) => {
  try {
    const robots = await Robot.findAll()
    res.json(robots)
  } catch (error) {
    // res.sendStatus(500)
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
