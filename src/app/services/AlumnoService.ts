import { Injectable } from '@angular/core';
import { AlumnoScheme } from '../models/alumnos';
import { Observable, Observer } from 'rxjs';

declare var google: any;

@Injectable()

export class AlumnoService {
  getLatLan(address: string) {
    let geocoder = new google.maps.Geocoder();
    return Observable.create(observer => {
      geocoder.geocode( { 'address': address}, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
          let obj: Object = {lat: results[0].geometry.location.lat(),
            lng: results[0].geometry.location.lng() };
            observer.next(obj);
            observer.complete();
        } else {
            console.log('Error - ', results, ' & Status - ', status);
            observer.next({});
            observer.complete();
        }
      });
    });
  }
  
}
