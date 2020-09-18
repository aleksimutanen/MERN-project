var mongoose = require('mongoose')
mongoose.set('useFindAndModify', false);
const baseSchema = require('./projectBase')

const zoneSchema = mongoose.Schema({
  floorAreaM2: { type: Number, required: false },
  officeAreaM2: { type: Number, required: false },
  parkingspotsCount: { type: Number, required: false },
});

zoneSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = baseSchema.discriminator('Zone', zoneSchema)
