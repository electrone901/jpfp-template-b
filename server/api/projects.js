const router = require('express').Router()
const Project = require('../db/project')

// ASYNC AWAIT SOLUTION
router.get('/', async (req, res, next) => {
  // console.log('HELLO FROM EXPRESS ')
  try {
    const projects = await Project.findAll()
    // console.log(
    //   'projects',
    //   projects
    // )
    res.json(projects)
    // res.json([{
    //   title: 'ghello'
    // }])
  } catch (error) {
    // res.sendStatus(500) // this also works I guess
    next(error)
  }
})

// DOT THEN SOLUTION
// router.get('/', (req, res, next) => {
//   Project.findAll()
//   .then(projects => {
//     res.json(projects)
//   })
//   .catch(err => {
//     next(err)
//   })
// })

module.exports = router
