var mongoose = require('mongoose')
mongoose.set('useFindAndModify', false);
const baseSchema = require('./projectBase')


const parkingComplexSchema = mongoose.Schema({
  parkingAreaM2: { type: Number, required: false },
  parkingspotsCount: { type: Number, required: false },
});

parkingComplexSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = baseSchema.discriminator('ParkingComplex', parkingComplexSchema)
