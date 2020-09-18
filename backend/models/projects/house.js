const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false);
const baseSchema = require('./projectBase')

const houseSchema = mongoose.Schema({
  floorAreaM2: { type: Number, required: true },
  parkingAreaM2: { type: Number, required: false },
  apartmentCount: { type: Number, required: false },
  parkingspotsCount: { type: Number, required: false },
});


houseSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = baseSchema.discriminator('House', houseSchema)
