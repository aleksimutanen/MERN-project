const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
mongoose.set('useCreateIndex', true)
mongoose.set('useFindAndModify', false);

const employeeSchema = mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  email: { type: String, required: true },

  image: { type: String, required: false },

  // image: { data: Buffer },

  currentEmployee: { type: Boolean, required: true },
  projects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: 'Project'
    }
  ]
})

employeeSchema.plugin(uniqueValidator)

employeeSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})


module.exports = mongoose.model('Employee', employeeSchema)