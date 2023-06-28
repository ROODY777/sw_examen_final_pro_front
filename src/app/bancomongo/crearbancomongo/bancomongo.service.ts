import { HttpClient, HttpHeaders } from "@angular/common/http";
import { EventEmitter, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from "src/environments/environment";
import Swal from "sweetalert2";
import { bancomongo } from '../bancomongo';

@Injectable({
    providedIn: 'root'
})

export class bancomongoService {

    private apiURL = 'http://localhost:8093' + '/api/v1'+ '/bancos';
    private apiURLMongo = 'http://localhost:8081' + '/api/v1'+ '/bancos';
    private apiURLPostgre = 'http://localhost:8091' + '/api/v1'+ '/bancos';

    private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })
  
    //private urlEndPoint: string = 'http://localhost:8081/cuenta';
  
    constructor(private http: HttpClient, private router: Router) {
  
    }

    
      createPostgre(cuentaBancaria: bancomongo): Observable<bancomongo> {
        debugger
        return this.http.post(this.apiURLPostgre , cuentaBancaria, { headers: this.httpHeaders }).pipe(
          map((response: any) => response.cuentaBancaria as bancomongo),
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

//MongoDb Inicio
      getTodosbancoMOngo(): Observable<bancomongo[]> {
        return this.http.get(this.apiURLMongo ).pipe(
          map(response => response as bancomongo[])
        );
      }




      create(cuentaBancaria: bancomongo): Observable<bancomongo> {
        debugger
        return this.http.post(this.apiURLMongo , cuentaBancaria, { headers: this.httpHeaders }).pipe(
          map((response: any) => response.cuentaBancaria as bancomongo),
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
    



delete(id: string): Observable<bancomongo> {
  debugger
  return this.http.delete<bancomongo>(`${this.apiURLMongo}/${id}`, { headers: this.httpHeaders }).pipe(
    catchError(e => {
      console.error(e.error.mensaje);
      Swal.fire(e.error.mensaje, e.error.mensaje, 'error')
      return throwError(e);
    })
  );
}




getBancoid(id: number): Observable<bancomongo> {
debugger
  return this.http.get<bancomongo>(`${this.apiURLMongo}/${id}`).pipe(
    catchError(e => {
      this.router.navigate(['/listar-banco-mongo']);
      console.error(e.error.mensaje);
      Swal.fire('Error mal Editar', e.error.mensaje, 'error');
      return throwError(e);
      console.log(e);
    })
  );
}





update(cuentaBancaria: bancomongo): Observable<any> {

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











//MongoDb Fin






}