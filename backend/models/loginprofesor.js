var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var Profesor = mongoose.model('Profesor');

var loginSchema  = new Schema({
  email:         { type: String },
  password:     { type: String },
  data:    { type: Schema.ObjectId, ref: "Profesor"},
});
module.exports = mongoose.model('LoginProfesor', loginSchema);
