import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {Observable } from "rxjs";
import { map, catchError, tap } from 'rxjs/operators';
import { environment } from "src/environments/environment";
import { moneda } from "./moneda";
import { TipoCuentabancaria } from "./tipoCuentabancaria";
import { banco } from './banco';
import { Router } from "@angular/router";
import { throwError } from 'rxjs';
import Swal from "sweetalert2";
import { CuentaBancariaRudy } from "./cuentabancariaRudy";
import swal from 'sweetalert2';



@Injectable({
  providedIn: 'root'
})

export class CuentaBancariaService {


  private apiURL = environment.apiURL + 'cuenta';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

  //private urlEndPoint: string = 'http://localhost:8081/cuenta';

  constructor(private http: HttpClient, private router: Router) {

  }




  create(cuentaBancaria: CuentaBancariaRudy): Observable<CuentaBancariaRudy> {
    debugger
    return this.http.post(this.apiURL + '/CuentaBancariaRegistrar', cuentaBancaria, { headers: this.httpHeaders }).pipe(
      map((response: any) => response.cuentaBancaria as CuentaBancariaRudy),
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








  getTodosCuentaBancaria(): Observable<CuentaBancariaRudy[]> {
    return this.http.get(this.apiURL + '/lista').pipe(
      map(response => response as CuentaBancariaRudy[])
    );
  }

  CuentaBancariaListaXIdCuentaUsuario(id: number): Observable<CuentaBancariaRudy[]> {
    return this.http.get<CuentaBancariaRudy[]>(`${this.apiURL}/CuentaBancariaListaXIdCuentaUsuario/${id}`, { headers: this.httpHeaders }).pipe(
      catchError(e => {
        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje, e.error.mensaje, 'error')
        return throwError(e);
      })
    );
  }





  update(cuentaBancaria: CuentaBancariaRudy): Observable<any> {

    return this.http.put<any>(`${this.apiURL + '/CuentaBancariaActualizar'}/${cuentaBancaria.id}`, cuentaBancaria, { headers: this.httpHeaders })
    .pipe(
      catchError(e => {
        if (e.status == 400) {
          return throwError(e);
        }
        console.error(e.error.mensaje);
        Swal.fire('Error al editar cuenta bancaria', e.error.mensaje, 'error')
        return throwError(e);
      })
    );

  }




  getCuentaBancaria(id): Observable<CuentaBancariaRudy> {

    return this.http.get<CuentaBancariaRudy>(`${this.apiURL}/CuentaBancariaBuscar/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/lista']);
        console.error(e.error.mensaje);
        Swal.fire('Error mal Editar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }





  delete(id: number): Observable<CuentaBancariaRudy> {
    return this.http.delete<CuentaBancariaRudy>(`${this.apiURL}/CuentaBancariaEliminar/${id}`, { headers: this.httpHeaders }).pipe(
      catchError(e => {
        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje, e.error.mensaje, 'error')
        return throwError(e);
      })
    );
  }



  subirFoto(archivo:File,id): Observable<HttpEvent<{}>>{

    let formData = new FormData();
    formData.append("archivo", archivo);
    formData.append("id",id);

    const req = new HttpRequest('POST',`${this.apiURL}/CuentaBancariaFoto/upload`,formData,{
      reportProgress : true
    });


   // return this.http.post(`${this.apiURL}/CuentaBancariaFoto/upload`,formData).pipe(
      //usamos este metodo para barra progreso 
    /*  return this.http.request(req).pipe(
      map((response: any) => response.cliente as CuentaBancariaRudy),
      catchError(e => {
        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );*/

    return this.http.request(req);
  }
















  //combo box
  
  getTipoCuentabancaria(): Observable<TipoCuentabancaria[]> {
    
    return  this.http.get<TipoCuentabancaria[]>(this.apiURL + '/tipoCuentaBancaria');
  }

  getTipoMoneda(): Observable<moneda[]> {
    return this.http.get<moneda[]>(this.apiURL + '/monedas');
  }

  getTipoBanco(): Observable<banco[]> {
   // debugger
    return this.http.get<banco[]>(this.apiURL + '/bancos');
  }




}