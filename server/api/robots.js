const router = require('express').Router()
const Robot = require('../db/robot')

router.get('/', async (req, res, next) => {
  try {
    res.json(await Robot.findAll())
  } catch (err) {
    next(err)
  }
})

module.exports = router
