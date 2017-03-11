var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var alumnoSchema  = new Schema({
  nombre:       { type: String },
  apellidos:    { type: String },
  edad:         { type: String }
});
module.exports = mongoose.model('Alumno', alumnoSchema);
