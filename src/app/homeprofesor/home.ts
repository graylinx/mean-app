import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { AuthHttp, JwtHelper } from 'angular2-jwt';
import {ProfesorScheme} from '../models/profesores';
import { Http,  Headers, RequestOptions } from '@angular/http';

import {FileSelectDirective,
        FileDropDirective,
        FileUploader} from 'ng2-file-upload/ng2-file-upload';

const URL ='https://www.classcity.tk/app/uploads/';

@Component({
  selector: 'home',
  templateUrl: './home.html',
  styleUrls: [ './home.css' ]
})

export class HomeProfesor {
  jwt: string;
  decodedJwt: Data;
  imgsrc: string;
  jwtHelper: JwtHelper = new JwtHelper();


  public uploader: FileUploader = new FileUploader({url: URL});

  constructor(public router: Router, public http: Http, public authHttp: AuthHttp) {
    this.jwt = localStorage.getItem('id_token');
    this.decodedJwt = this.jwt && this.jwtHelper.decodeToken(this.jwt);
    this.imgsrc = 'https://www.classcity.tk:8080/app/' +  this.decodedJwt.id.path;
  }

  ngOnInit(): void {
    this.getnotification(this.decodedJwt);

  }

getready(profe: string, alumno: string) {
  console.log(profe, "PENE");
  console.log(alumno, "pene");
  let url = 'https://www.classcity.tk/app/readynotification';
  let body = JSON.stringify({'profe': profe, "alumno": alumno});
  let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
  let options = new RequestOptions({ headers: headers });

  this.http.post(url, body, options)
    .subscribe(
      response => {
         console.log(response);
       },
       error => {
         alert(error.text());
         console.log(error.text());
       }
    );
  }




  getnotification(data: any){
    console.log(data);

    if (data.id.notification.length == 0){
      alert("No tienes inguna notificación");
    }else{
      for(let item of data.id.notification){
        if (!item["leido"]){
          this.getready(data.id._id, item["alumno"]._id);
          //manejo el objeto alumno y envio una peticion get con numero de iteración


        }
        console.log();
        alert("Tienes una notificación de: " + item.nombre);
      }
    }
  }

  sendimg() {
    for (let item of this.uploader.queue){
      item.file.name = this.decodedJwt.Email;
      item.upload();
    }
  }

  logout() {
    localStorage.removeItem('id_token');
    this.router.navigate(['/login']);
  }
}

interface Data {
  Email: string;
  id: {
    _id: string,
    apellidos: string,
    asignaturas: string,
    curso: string,
    edad: string,
    location: { lat: number, lng: number}
    nombre: string,
    path: string
  };
}
