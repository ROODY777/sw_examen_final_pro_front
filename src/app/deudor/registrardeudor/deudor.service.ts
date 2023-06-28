import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from "src/environments/environment";
import Swal from "sweetalert2";
import { Deudor } from '../Deudor';
import { CargoEmpresaDeudor } from '../CargoEmpresaDeudor';

@Injectable({
    providedIn: 'root'
  })
  
  export class DeudorService {



    private apiURL = environment.apiURL + 'deudor';
    private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })
  
  
    constructor(private http: HttpClient, private router: Router) {
  
    }
  



    create(deudor: Deudor): Observable<Deudor> {
        debugger
        return this.http.post(this.apiURL + '/deudorRegistrar', deudor, { headers: this.httpHeaders }).pipe(
          map((response: any) => response.cuentaBancaria as Deudor),
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
    


      getTodosDeudor(): Observable<Deudor[]> {
        return this.http.get(this.apiURL + '/deudorListar').pipe(
          map(response => response as Deudor[])
        );
      }






      delete(id: number): Observable<Deudor> {
        return this.http.delete<Deudor>(`${this.apiURL}/deudorEliminar/${id}`, { headers: this.httpHeaders }).pipe(
          catchError(e => {
            console.error(e.error.mensaje);
            Swal.fire(e.error.mensaje, e.error.mensaje, 'error')
            return throwError(e);
          })
        );
      }
    



      //combo box roody
      getTipoCargoEMpresaDeudor(): Observable<CargoEmpresaDeudor[]> {
        return this.http.get<CargoEmpresaDeudor[]>(this.apiURL + '/cargoEmpresaDeudor');
      }




      update(deudor: Deudor): Observable<any> {

        return this.http.put<any>(`${this.apiURL + '/deudorActualizar'}/${deudor.id}`, deudor, { headers: this.httpHeaders })
        .pipe(
          catchError(e => {
            if (e.status == 400) {
              return throwError(e);
            }
            console.error(e.error.mensaje);
            Swal.fire('Error al editar deudor', e.error.mensaje, 'error')
            return throwError(e);
          })
        );
    
      }



      getDeudor(id): Observable<Deudor> {

        return this.http.get<Deudor>(`${this.apiURL}/deudorBuscar/${id}`).pipe(
          catchError(e => {
            this.router.navigate(['/lista']);
            console.error(e.error.mensaje);
            Swal.fire('Error mal Editar', e.error.mensaje, 'error');
            return throwError(e);
          })
        );
      }




















  }