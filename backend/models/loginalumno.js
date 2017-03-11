var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var Alumno = mongoose.model('Alumno');

var loginSchema  = new Schema({
  email:         { type: String },
  password:     { type: String },
  data:    { type: Schema.ObjectId, ref: "Alumno"},
});
module.exports = mongoose.model('LoginAlumno', loginSchema);
