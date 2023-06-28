import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Inversion } from './inversion';
import { Observable, throwError, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class InversionService {

  private apiURL = environment.apiURL + 'inversion';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

  private baseUrl = "http://localhost:8081/inversion";

  constructor(private httpClient: HttpClient) { }

  registrarInversion(inversion: Inversion): Observable<Object>{
    return this.httpClient.post(`${this.baseUrl}/registrar`, inversion);
  }

    //Roody 18/06/2023
    inversionesListaXIdCuentaUsuario(id: number): Observable<Inversion[]> {
      return this.httpClient.get<Inversion[]>(`${this.apiURL}/InversionesListaXIdCuentaUsuario/${id}`, { headers: this.httpHeaders }).pipe(
        catchError(e => {
          console.error(e.error.mensaje);
          Swal.fire(e.error.mensaje, e.error.mensaje, 'error')
          return throwError(e);
        })
      );
    }

    
    inversionesListaXIdCuentaUsuarioYXEstado(idcuentaUsuario: number, estado: string): Observable<any> {
      const params = new HttpParams().set("idcuentaUsuario", idcuentaUsuario).set("estado", estado);
      return this.httpClient.get(this.apiURL + "/InversionesListaXIdCuentaUsuarioYXEstado", { params });
    }
}
