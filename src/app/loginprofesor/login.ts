import { Component } from '@angular/core';
import { Router} from '@angular/router';
import { FormsModule }   from '@angular/forms';
import { Http, Headers, RequestOptions } from '@angular/http';
import { ProfesorScheme } from '../models/profesores';

@Component({
  selector: 'login',
  templateUrl: './login.html',
  styleUrls: [ './login.css' ]
})
export class LoginProfesor {

  profesor = new ProfesorScheme('', '', '', '', new Date(''), {lat: 0, lng: 0},
  '', '', './uploads/muestra');

  constructor(public router: Router, public http: Http) {  }

  login(description: ProfesorScheme) {
    let url = 'https://www.classcity.tk/app/loginprofesor';
    let body = JSON.stringify(description);
    let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    this.http.post(url, body, options)
      .subscribe(
        response => {
          localStorage.setItem('id_token', response.json().id_token);
          this.router.navigate(['/profile']);
        },
        error => {
          alert(error.text());
          console.log(error.text());
        }
      );
  }

  signup(event) {
    event.preventDefault();
    this.router.navigate(['/signupprofesor']);
  }
}
