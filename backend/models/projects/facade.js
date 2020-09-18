var mongoose = require('mongoose')
mongoose.set('useFindAndModify', false);
const baseSchema = require('./projectBase')

const facadeSchema = mongoose.Schema({
});

facadeSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = baseSchema.discriminator('Facade', facadeSchema)
