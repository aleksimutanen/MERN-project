const multer  = require('multer')

const employeeRouter = require('express').Router()
const Employee = require('../models/employee')
const Info = require('../models/companyInfo')
const { request } = require('express')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})

const upload = multer({
  storage: storage
})


employeeRouter.get('/', async (request, response, next) => {
  const employees = await Employee.find({}).populate('projects', {projectName: 1, __t: 1})
  response.json(employees)
})

employeeRouter.post('/', async (request, response, next) => {

  const body = request.body

  if (body.name === undefined) {
    return response.status(400).json({ error: 'missing name' })
  }

  const employee = new Employee({
    ...body
  })

  const savedEmployee = await employee.save()

  response.json(savedEmployee)
})

// employeeRouter.post('/ci', async (request, response, next) => {
//   const body = request.body

//   if (body.name === undefined) {
//     return response.status(400).json({ error: 'missing name' })
//   }

//   const info = new Info({
//     ...body
//   })

//   const savedInfo = await info.save()

//   response.json(savedInfo)
// })

employeeRouter.put('/:id', async (request, response, next) => {

  const body = request.body

  const employee = {
    ...body
  }

  const moddedEmployee = await Employee.findByIdAndUpdate(
    request.params.id, 
    employee, 
    { new: true }
    )
    .populate('projects', {projectName: 1, __t: 1})

  response.json(moddedEmployee)
})

employeeRouter.delete('/:id', async (request, response, next) => {

  await Employee.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

employeeRouter.post('/images', upload.array('files', 6), async (request, response, next) => {
  console.log(request.files)
  response.json(request.files.map(file => file.originalname))
})


employeeRouter.get('/image/:filename', (request, response, next) => {
  const file = request.params.filename
  response.sendFile(file, {root: './uploads'})
})























// employeeRouter.get('/', async (request, response) => {
//   const employees = await Employee.find({}).populate('projects', {projectName: 1, __t: 1})
//   response.json(employees.map(e => e.toJSON()))
// })


// employeeRouter.post('/', async (request, response, next) => {

//   const decodedToken = jwt.verify(request.token, process.env.SECRET)
//   if (!request.token || !decodedToken.id) {
//     return response.status(401).json({ error: 'token missing or invalid' })
//   }

//   const body = request.body

//   if (body.name === undefined) {
//     return response.status(400).json({ error: 'missing name' })
//   }

//   const employee = new Employee({
//     ...body,
//     image: fs.readFileSync(path.join('./uploads/' + body.image))
//   })

//   const savedEmployee = await employee.save()

//   response.json(savedEmployee.toJSON())
// })

// employeeRouter.put('/:id', async (request, response, next) => {

//   const decodedToken = jwt.verify(request.token, process.env.SECRET)
//   if (!request.token || !decodedToken.id) {
//     return response.status(401).json({ error: 'token missing or invalid' })
//   }

//   const body = request.body

//   const employee = {
//     ...body,
//     image: fs.readFileSync(path.join('./uploads/' + body.image))
//   }

//   const moddedEmployee = await Employee.findByIdAndUpdate(
//     request.params.id, 
//     employee, 
//     { new: true }
//     )
//     .populate('projects', {projectName: 1, __t: 1})

//   response.json(moddedEmployee.toJSON())
// })


// employeeRouter.post('/images', upload.array('files', 6), async (request, response, next) => {
//   console.log(request.files)

//   const newEmployee = Employee({
//     // image: fs.readFileSync(request.files[0].filename, {root: './uploads'})
//     image: fs.readFileSync(path.join('./uploads/' + request.files[0].filename))
//   })

//   console.log(newEmployee)

//   response.json(request.files.map(file => file.originalname))
// })


module.exports = employeeRouter