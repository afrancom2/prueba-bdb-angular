import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Location } from './location';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  private urlEndPoint: string = 'http://localhost:8080/api/locations';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private router: Router) {}

  getLocations(): Observable<Location[]> {
    return this.http.get<Location[]>(this.urlEndPoint);
  }

  create(location: Location): Observable<Location> {
    return this.http
      .post(this.urlEndPoint, location, { headers: this.httpHeaders })
      .pipe(
        map((response: any) => response.location as Location),
        catchError((error) => {
          console.error(error.error.mensaje);
          swal.fire(error.error.mensaje, error.error.error, 'error');
          return throwError(error);
        })
      );
  }

  getLocation(id: number): Observable<Location> {
    return this.http.get<Location>(`${this.urlEndPoint}/${id}`).pipe(
      catchError((error) => {
        this.router.navigate(['/locations']);
        console.error(error.error.mensaje);
        swal.fire(
          'Error al obtener la location ',
          error.error.mensaje,
          'error'
        );
        return throwError(error);
      })
    );
  }

  update(location: Location): Observable<any> {
    return this.http
      .put<any>(`${this.urlEndPoint}/${location.id}`, location, {
        headers: this.httpHeaders,
      })
      .pipe(
        catchError((error) => {
          console.error(error.error.mensaje);
          swal.fire(error.error.mensaje, error.error.error, 'error');
          return throwError(error);
        })
      );
  }

  delete(id: number): Observable<Location> {
    return this.http
      .delete<Location>(`${this.urlEndPoint}/${id}`, {
        headers: this.httpHeaders,
      })
      .pipe(
        catchError((error) => {
          console.error(error.error.mensaje);
          swal.fire(error.error.mensaje, error.error.error, 'error');
          return throwError(error);
        })
      );
  }
}
