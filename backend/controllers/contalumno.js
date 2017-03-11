var _       = require('lodash'),
    config  = require('../config'),
    jwt     = require('jsonwebtoken'),
    mongoose = require('mongoose');

require("../models/alumno");
require("../models/loginalumno");
var DataAlumno = mongoose.model('Alumno');
var AlumnoScheme  = mongoose.model('LoginAlumno');

function createToken(user) {
  return jwt.sign(_.omit(user, 'Password'), config.secret, { expiresInMinutes: 30 });
}

exports.registeralumno = function(req, res) {

  var datos = new DataAlumno(
  { nombre: req.body.Nombre,
    apellidos:    req.body.Apellidos,
    edad:         req.body.Edad });

	var alumno = new AlumnoScheme(
  { email:       req.body.Email,
    password:     req.body.Password,
    data : datos});

  //comprobar si el Nick ya existe
  AlumnoScheme.find( { "email": alumno.email }, function(err, data) {

    if (data.length == 0){
      if (!alumno.email || !alumno.password) {
        res.status(400).send("You must send the username and the password");
      }else{
        alumno.save(function(err, datasave) {
          if(err) return res.send(500, err.message);
          var profile = _.pick(req.body, 'Email', 'Password', 'extra');
          profile.id = datasave.data;
          res.status(201).send({ id_token: createToken(profile) });
        });
        datos.save(function(err, datasave) {
          if(err) return res.send(500, err.message);
        });
      }
    }else{
        res.status(400).send("A user with that username already exists");
    }
  });
};

exports.loginalumno = function(req, res) {
  AlumnoScheme.find({"email" : req.body.Email}, function(err, login) {
    if (login.length != 0){
      DataAlumno.populate(login, {path: "data"},function(err, libros){
        var profile = _.pick(req.body, 'Email', 'Password', 'extra');
        profile.id = libros[0].data;
        res.status(201).send({ id_token: createToken(profile) });
      });
    }else{
      res.status(401).send("The username or password don't match");
    }
  });
};
