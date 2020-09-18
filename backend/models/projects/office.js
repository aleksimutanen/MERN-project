var mongoose = require('mongoose')
mongoose.set('useFindAndModify', false);
const baseSchema = require('./projectBase')

const officeSchema = mongoose.Schema({
  floorAreaM2: { type: Number, required: true },
  parkingspotsCount: { type: Number, required: false },
});

officeSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = baseSchema.discriminator('Office', officeSchema)
