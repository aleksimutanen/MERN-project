var mongoose = require('mongoose')
mongoose.set('useFindAndModify', false);
const baseSchema = require('./projectBase')

const competitionSchema = mongoose.Schema({
  floorAreaM2: { type: Number, required: false },
  hectareCount: { type: Number, required: false },
});

competitionSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = baseSchema.discriminator('Competition', competitionSchema)
