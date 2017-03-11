var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var Alumno = mongoose.model('Alumno');

var profesorSchema  = new Schema({
  nombre:       { type: String },
  apellidos:    { type: String },
  edad:         { type: String },
  curso:        { type: String, enum:
    ['Primaria', 'ESO', 'Bachillerato', 'Universidad', 'FP',
    'EXAMENES LIBRES', 'FRACASO ESCOLAR'] },
  asignaturas:  { type: String},
  location: {
    type:       { type: String},
    coordinates: {type: []}
  },
  path:         {type: String},
  notification: {
    type: [{
      alumno: { type: Schema.ObjectId, ref: "Alumno"},
      leido: {type: Boolean},
      _id: false
    }]
  }
});



module.exports = mongoose.model('Profesor', profesorSchema);
