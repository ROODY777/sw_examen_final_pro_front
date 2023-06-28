import { HttpClient, HttpHeaders } from "@angular/common/http";
import { EventEmitter, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from "src/environments/environment";
import Swal from "sweetalert2";
import { monedapostgre } from "./monedapostgre";

@Injectable({
    providedIn: 'root'
})

export class monedaPostgreService {

    private apiURLMongo = 'http://localhost:8091' + '/api/v1'+ '/moneda';

    private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })
  
  
    constructor(private http: HttpClient, private router: Router) {
  
    }

    


      create(cuentaBancaria: monedapostgre): Observable<monedapostgre> {
        debugger
        return this.http.post(this.apiURLMongo , cuentaBancaria, { headers: this.httpHeaders }).pipe(
          map((response: any) => response.cuentaBancaria as monedapostgre),
          catchError(e => {
            if (e.status == 400) {
              return throwError(e);
            }
    
            console.error(e.error.mensaje);
            Swal.fire(e.error.mensaje, e.error.error, 'error')
            return throwError(e);
          })
        );
      }
    

      getTodosMoneda(): Observable<monedapostgre[]> {
        return this.http.get(this.apiURLMongo ).pipe(
          map(response => response as monedapostgre[])
        );
      }




      delete(id: string): Observable<monedapostgre> {
        debugger
        return this.http.delete<monedapostgre>(`${this.apiURLMongo}/${id}`, { headers: this.httpHeaders }).pipe(
          catchError(e => {
            console.error(e.error.mensaje);
            Swal.fire(e.error.mensaje, e.error.mensaje, 'error')
            return throwError(e);
          })
        );
      }
      











      update(cuentaBancaria: monedapostgre): Observable<any> {

        return this.http.put<any>(`${this.apiURLMongo }`, cuentaBancaria, { headers: this.httpHeaders })
        .pipe(
          catchError(e => {
            if (e.status == 400) {
              return throwError(e);
            }
            console.error(e.error.mensaje);
            Swal.fire('Error al editar Banco', e.error.mensaje, 'error')
            return throwError(e);
          })
        );
      
      }
      

      getBancoid(id: number): Observable<monedapostgre> {
        debugger
          return this.http.get<monedapostgre>(`${this.apiURLMongo}/${id}`).pipe(
            catchError(e => {
              this.router.navigate(['/listar-moneda-postgre']);
              console.error(e.error.mensaje);
              Swal.fire('Error mal Editar', e.error.mensaje, 'error');
              return throwError(e);
              console.log(e);
            })
          );
        }
        


















}