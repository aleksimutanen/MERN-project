const Project = require('../models/projects/projectBase')
const House = require('../models/projects/house')
const ParkingComplex = require('../models/projects/parkingComplex')
const Facade = require('../models/projects/facade')
const Office = require('../models/projects/office')
const Zone = require('../models/projects/zone')
const Competition = require('../models/projects/competition')



const schemaSelector = (body) => {
  switch(body.type) {
    case 'house':
      return House
    case 'parkingComplex':
      return ParkingComplex 
    case 'facade':
      return Facade
    case 'office':
      return Office
    case 'zone':
      return Zone
    case 'competition':
      return Competition

    default:
      return Project
  }
} 

module.exports = schemaSelector
