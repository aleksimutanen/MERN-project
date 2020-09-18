const router = require('express').Router()
const Project = require('../models/house')
const User = require('../models/user')
const Employee = require('../models/employee')

router.post('/reset', async (request, response) => {
  await Project.deleteMany({})
  await User.deleteMany({})
  await Employee.deleteMany({})

  response.status(204).end()
})

module.exports = router