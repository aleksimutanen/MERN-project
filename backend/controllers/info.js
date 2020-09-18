const infoRouter = require('express').Router()
const CompanyInfo = require('../models/companyInfo')
const multer  = require('multer')

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


infoRouter.get('/', async (request, response) => {
  const companyInfo = await CompanyInfo.findOne({})
  // const companyInfo = await CompanyInfo.find({})
  response.json(companyInfo)
  // response.json(companyInfo.map(info => info.toJSON()))
})

infoRouter.put('/:id', async (request, response) => {

  const body = request.body

  const info = {
    ...body
  }

  const moddedInfo = await CompanyInfo.findByIdAndUpdate(
    request.params.id,
    info,
    { new: true }
  )

  response.json(moddedInfo)
})

infoRouter.post('/images', upload.array('files', 6), async (request, response, next) => {
  console.log(request.files)
  response.json(request.files.map(file => file.originalname))
})

infoRouter.get('/image/:filename', (request, response) => {
  const file = request.params.filename
  response.sendFile(file, {root: './uploads'})
})

module.exports = infoRouter