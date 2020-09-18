const mongoose = require('mongoose')
mongoose.set('useCreateIndex', true)
mongoose.set('useFindAndModify', false);

const companyInfoSchema = mongoose.Schema({
  name: { type: String, required: true },
  logo: { type: String, required: true },
  about: [{ type: String, required: true }],
  images: [{ type: String, required: false }],
  address: { type: String, required: true },
  postalCode: { type: String, required: true },
  phone: { type: String, required: true },
  companyId: { type: String, required: true },
  coords: { 
    lat: {type: Number, required: true },
    lng: {type: Number, required: true },
  }
})


companyInfoSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})


module.exports = mongoose.model('CompanyInfo', companyInfoSchema)