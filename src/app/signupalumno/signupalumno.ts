import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule }   from '@angular/forms';
import { Http, Headers, RequestOptions } from '@angular/http';
import { AlumnoScheme } from '../models/alumnos';

@Component({
  selector: 'signupalumno',
  templateUrl: './signupalumno.html',
  styleUrls: [ './signupalumno.css' ]
})

export class SignupAlumno {

  alumno = new AlumnoScheme('', '', '', '', new Date(''), {lat: 0, lng: 0});

  constructor(public router: Router, public http: Http) {
  }

  registrar(description: AlumnoScheme) {
    let url = 'http://ec2-52-90-104-48.compute-1.amazonaws.com:8080/registeralumno';
    let body = JSON.stringify(description);
    let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    this.http.post(url, body, options)
      .subscribe(
        response => {
          localStorage.setItem('id_token', response.json().id_token);
          this.router.navigate(['/home']);
        },
        error => {
          alert(error.text());
          console.log(error.text());
        }
      );
  }

  login(event) {
    event.preventDefault();
    this.router.navigate(['/alumno']);
  }

}
