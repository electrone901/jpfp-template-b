const router = require('express').Router()
const {Campus} = require('../db')

router.get('/', async (req, res, next) => {
  try {
    res.json(await Campus.findAll())
  } catch (err) {
    next(err)
  }
})

module.exports = router
