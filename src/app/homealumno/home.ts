import { Component, ChangeDetectorRef } from '@angular/core';
import { Http,  Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { AuthHttp, JwtHelper } from 'angular2-jwt';
import {AlumnoService} from '../services/AlumnoService';
import {QueryScheme} from '../models/query';
import {ASIGNATURAS} from '../models/asignaturas';


@Component({
  selector: 'home',
  templateUrl: './home.html',
  styleUrls: [ './home.css' ]
})

export class HomeAlumno {
  jwt: string;
  decodedJwt: Object;
  profesores: Object[] = [];

  asignaturas: Object = ASIGNATURAS;
  address : string = 'Madrid';
  curso = ['Primaria', 'ESO', 'Bachillerato', 'Universidad', 'FP',
  'EXAMENES LIBRES', 'FRACASO ESCOLAR'];
  distancia: number[] = [1000, 2000, 3000, 4000, 5000];
  query = new QueryScheme(this.curso[0],  this.asignaturas[0][this.curso[0]][0],
  {lat: 40.416775, lng: -3.703790199999957}, 2000);
  open: boolean = false;
  enable: boolean = false;
  iconUrl: string = './assets/images/home.png';
  jwtHelper: JwtHelper = new JwtHelper();

  constructor(public router: Router, public http: Http,
  public authHttp: AuthHttp, private alumnoService: AlumnoService,
  private ref: ChangeDetectorRef) {
    this.jwt = localStorage.getItem('id_token');
    this.decodedJwt = this.jwt && this.jwtHelper.decodeToken(this.jwt);
  }

  select(id: string) {
    this.enable = true;
    let border = document.getElementById(id);
    border.style.border = '10px solid green';
  }

  desselect(id: string) {
    this.enable = false;
    let border = document.getElementById(id);
    border.style.border = '2px solid';
  }

  changeborder(id: string) {
    if (!this.enable) {
      let border = document.getElementById(id);
      border.style.border = '10px solid yellow';
    }
  }

  rechangeborder(id: string) {
    if (!this.enable) {
      let border = document.getElementById(id);
      border.style.border = '2px solid';
    }
  }

  position(){
    console.log("Dame la posicion aztual");
  }

  initcoor(address: string) {
    this.alumnoService.getLatLan(address).
      subscribe(
        resolve => {
          this.query.Loc = resolve;
          this.ref.detectChanges();
        }
      );
  }

  keypressHandler(event: any, address: string) {
       if (event.keyCode === 13) {
           this.initcoor(address);
       }
   }

  sendquery(description: QueryScheme) {
    let url = 'http://ec2-52-90-104-48.compute-1.amazonaws.com:8080/profesores';
    let body = JSON.stringify(description);
    let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    this.http.post(url, body, options)
      .subscribe(
        response => {
           this.profesores = response.json();
         },
         error => {
           alert(error.text());
           console.log(error.text());
         }
      );
  }

  getallprof() {
    let url = 'http://ec2-52-90-104-48.compute-1.amazonaws.com:8080/profesores';
    this.http.get(url).
      subscribe(
       response => {
          this.profesores = response.json();
        },
        error => {
          alert(error.text());
          console.log(error.text());
        }
      );
  }

  goDetail(id: string) {
    this.router.navigate(['/detail', id]);
  }

  logout() {
    localStorage.removeItem('id_token');
    this.router.navigate(['/login']);
  }
}
