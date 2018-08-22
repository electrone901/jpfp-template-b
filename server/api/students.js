const router = require('express').Router()
const {Student} = require('../db')

router.get('/', async (req, res, next) => {
  try {
    res.json(await Student.findAll())
  } catch (err) {
    next(err)
  }
})

module.exports = router
