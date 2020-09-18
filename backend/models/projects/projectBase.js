var mongoose = require('mongoose')

const baseSchema = mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: [
      'house', 'parkingComplex', 'facade', 'office', 'zone', 'competition'
    ],
    default: 'house'
  },

  status: {
    type: String,
    required: true,
    enum: [
      'designing', 'construction', 'finished'
    ],
    default: 'finished'
  },

  projectName: { type: String, required: true, default: 'Helsinki, Finland' },
  relevant: { type: Boolean, required: true, default: true },
  location: { type: String, required: true },
  shortDescription: { type: String, required: true },
  description: { type: String, required: true },
  startingDate: { type: String, required: true },
  finishedDate: { type: String, required: true },
  employer: { type: String, required: true },
  images: [{ type: String, required: false }],
  
  // images: [Buffer],
  // images: {data:[Buffer]},

  mainDesigner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Employee'
  },
  assistantDesigner: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: 'Employee'
  },
}, { collection: 'project' })


module.exports = mongoose.model('Project', baseSchema)