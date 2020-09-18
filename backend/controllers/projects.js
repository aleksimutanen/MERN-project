const projectRouter = require('express').Router()

const multer  = require('multer')

const Project = require('../models/projects/projectBase')
const Employee = require('../models/employee')

const SchemaSelector = require('../utils/projectSchemaSelector')

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


projectRouter.get('/:id', async (request, response, next) => {
  const project = await Project.findById(request.params.id).populate('mainDesigner', {name: 1}).populate('assistantDesigner', {name: 1})
  response.json(project)
})

projectRouter.get('/', async (request, response, next) => {
  const projects = await Project.find({}).populate('mainDesigner', {name: 1}).populate('assistantDesigner', {name: 1})
  response.json(projects)
})

projectRouter.get('/image/:filename', (request, response, next) => {
  const file = request.params.filename
  response.sendFile(file, {root: './uploads'})
})

projectRouter.post('/images', upload.array('files', 6), async (request, response, next) => {
  console.log(request.files)
  response.json(request.files.map(file => file.originalname))
})

projectRouter.post('/', async (request, response, next) => {

  const body = request.body

  if (body.type === undefined) {
    return response.status(400).json({ error: 'missing type' })
  }

  const mainDesigner = await Employee.findOne({name: body.mainDesigner})
  const assistantDesigner = await Employee.findOne({name: body.assistantDesigner})

  const projectType = SchemaSelector(body)

  const project = new projectType({
    ...body,
    mainDesigner: mainDesigner.id,
    assistantDesigner: assistantDesigner.id
  })

  console.log(project)

  const savedProject = await project.save()

  mainDesigner.projects = mainDesigner.projects.concat(savedProject._id)
  assistantDesigner.projects = assistantDesigner.projects.concat(savedProject._id)
  await mainDesigner.save()
  await assistantDesigner.save()

  response.json(savedProject)
})

projectRouter.delete('/:id', async (request, response, next) => {

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  await Project.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

projectRouter.put('/:id', async (request, response, next) => {

  const body = request.body

  const mainDesigner = await Employee.findOne({name: body.mainDesigner})
  const assistantDesigner = await Employee.findOne({name: body.assistantDesigner})

  const projectType = SchemaSelector(body)

  console.log(projectType)

  const project = {
    ...body,
    mainDesigner: mainDesigner.id,
    assistantDesigner: assistantDesigner.id,
    __t: projectType.modelName
  }

  console.log(project)

  const moddedProject = await Project.findByIdAndUpdate(
    request.params.id, 
    project, 
    { new: true, overwrite: true }
    )
    .populate('mainDesigner', {name: 1})
    .populate('assistantDesigner', {name: 1})

  response.json(moddedProject)
})

// projectRouter.get('/', async (request, response) => {
//   console.log('start project query')

//   const projects = await Project.find({}).populate('mainDesigner', {name: 1}).populate('assistantDesigner', {name: 1})
//   // projects.map(p => p.images.map(i => i.toString('base64')))

//   for (let i = 0; i < projects.length; i++) {
//     for (let k = 0; k < projects[i].images.length; k++) {
//       projects[i].images[k] = projects[i].images[k].toString('base64') 
//     }
//   }

//   console.log('finished')

//   // projects[0].images[0] = projects[0].images[0].toString('base64')
//   // projects[0].images[1] = projects[0].images[1].toString('base64')

//   // console.log(projects[0].images[0])

//   response.json(projects.map(p => p.toJSON()))
// })


// projectRouter.post('/', async (request, response, next) => {

//   const decodedToken = jwt.verify(request.token, process.env.SECRET)
//   if (!request.token || !decodedToken.id) {
//     return response.status(401).json({ error: 'token missing or invalid' })
//   }

//   const body = request.body

//   if (body.type === undefined) {
//     return response.status(400).json({ error: 'missing type' })
//   }

//   const mainDesigner = await Employee.findOne({name: body.mainDesigner})
//   const assistantDesigner = await Employee.findOne({name: body.assistantDesigner})

//   const projectType = SchemaSelector(body)

//   const project = new projectType({
//     ...body,
//     images: body.images.map(img => fs.readFileSync(path.join('./uploads/' + img))),
//     mainDesigner: mainDesigner.id,
//     assistantDesigner: assistantDesigner.id
//   })

//   console.log(project)

//   const savedProject = await project.save()

//   mainDesigner.projects = mainDesigner.projects.concat(savedProject._id)
//   assistantDesigner.projects = assistantDesigner.projects.concat(savedProject._id)
//   await mainDesigner.save()
//   await assistantDesigner.save()

//   response.json(savedProject.toJSON())
// })


// projectRouter.put('/:id', async (request, response, next) => {

//   const decodedToken = jwt.verify(request.token, process.env.SECRET)
//   if (!request.token || !decodedToken.id) {
//     return response.status(401).json({ error: 'token missing or invalid' })
//   }

//   const body = request.body

//   const mainDesigner = await Employee.findOne({name: body.mainDesigner})
//   const assistantDesigner = await Employee.findOne({name: body.assistantDesigner})

//   const projectType = SchemaSelector(body)

//   console.log(projectType)

//   const project = {
//     ...body,
//     images: body.images.map(img => fs.readFileSync(path.join('./uploads/' + img))),
//     mainDesigner: mainDesigner.id,
//     assistantDesigner: assistantDesigner.id,
//     __t: projectType.modelName
//   }

//   console.log(project)

//   const moddedProject = await Project.findByIdAndUpdate(
//     request.params.id, 
//     project, 
//     { new: true, overwrite: true }
//     )
//     .populate('mainDesigner', {name: 1})
//     .populate('assistantDesigner', {name: 1})

//   response.json(moddedProject.toJSON())
// })

module.exports = projectRouter